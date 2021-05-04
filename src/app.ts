import express, { Request, Application, Express, NextFunction } from "express";
import log, { errorHandler } from "./services/logger";
import config from "./config";

import response from "./services/response";
import helmet from "helmet";
import { redisClient, apiCache } from "./services/redis";
import shortId from "shortid";

import RateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { join } from "path";
import { readdirSync } from "fs";

import hpp from "hpp";
//types missing
import { format } from "url";

//types missing
import fnv from "fnv-plus";

import queue from "./services/queue";

//routes
import sampleRoute from "./routes/oks";

interface IApplication extends Express {
  _sanitizeRequestUrl: (req: Request) => string;
}
const app = <IApplication>express();

const redis = redisClient();

//security
app.use(helmet());

const limiter = RateLimit({
  store: new RedisStore({
    client: redis,
    expiry: (config.rateLimitExpiry as number) * 60, // 15 min (seconds)
  }),
  max: 100,
  windowMs: (config.rateLimitExpiry as number) * 60 * 1000, // 15 min (milliseconds)
});

app.use(limiter);

/** Parse the body of the request */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//http parameter pollution
app.use(hpp());

app._sanitizeRequestUrl = function (req) {
  const requestUrl = format({
    protocol: req.protocol,
    host: req.hostname,
    pathname: req.originalUrl || req.url,
    query: req.query as any,
  });

  return requestUrl.replace(/(password=).*?(&|$)/gi, "$1<hidden>$2");
};

//log requests in DB
app.use((req: Request, res, next) => {
  const ipAddress = req.ip;
  req.requestId = fnv
    .hash(
      shortId.generate() +
        Math.floor(100000 + Math.random() * 900000) +
        "" +
        Date.now() +
        "" +
        ipAddress,
      128
    )
    .str();
  res.set("X-Request-Id", req.requestId);

  //remove password and card no from request body before logging
  const { password, cardno, ...data } = req.body;

  const reqLog = {
    RequestId: req.requestId,
    ipAddress: ipAddress,
    url: app?._sanitizeRequestUrl(req),
    method: req.method,
    body: data,
    app: req.appId,
    user: req.accountId,
    device: req.get("user-agent"),
    createdAt: new Date(),
  };

  // Dump it in the queue
  queue.add("logRequest", reqLog);

  // persist RequestLog entry in the background; continue immediately

  log.info(reqLog);
  next();
});

//custom response
app.use(response);

//api caching
app.use(apiCache(redis));

//app.use("/api/v1", sampleRoute);

const _loadRoutes = (routeFiles) => {
  const versions: any[] = [];
  const ourRoutes = {};
  // Number of routes, removing index and initialize
  let currentRoute = 0;
  const routeNum = routeFiles.length * 1;

  // Comes with endpoint versioning
  // name file as [filename].v1.ts
  routeFiles.forEach(function (file) {
    currentRoute++;
    const splitFileName = file.split(".");
    if (splitFileName[0] !== "index" && splitFileName[0] !== "initialize") {
      if (splitFileName.length === 3) {
        ourRoutes[
          splitFileName[0] + "." + splitFileName[1]
        ] = require("./routes" + splitFileName[0] + "." + splitFileName[1]);
        app.use(
          "/api/" + splitFileName[1],
          ourRoutes[splitFileName[0] + "." + splitFileName[1]]
        );
        const splitVersion = splitFileName[1].split("v");
        const versionMap = {};
        versionMap[splitFileName[0]] = splitVersion[1];
        versions.push(versionMap);
      } else {
        ourRoutes[splitFileName[0]] = require("./routes/" +
          splitFileName[0] +
          "." +
          splitFileName[1]);
        app.use("/api/", ourRoutes[splitFileName[0]]);
      }
    }
    if (currentRoute === routeNum) {
      const finalVersions = {};
      versions.forEach(function (value) {
        Object.entries(value).forEach(([key, value]) => {
          if (key in finalVersions) {
            finalVersions[key].push(value);
          } else {
            finalVersions[key] = [];
            finalVersions[key].push(value);
          }
        });
      });
      Object.entries(finalVersions).forEach(([key, value]: [any, any]) => {
        const sorted = value.sort();
        const sortedlength = sorted.length * 1;
        app.use("/api/", ourRoutes[key + ".v" + sortedlength]);
      });
    }
  });
  return ourRoutes;
};

const normalizedPath = join(__dirname, "./routes");
const routeFiles = readdirSync(normalizedPath);

_loadRoutes(routeFiles);

/** Error handling */
app.use(function (req, res: any, next) {
  res.notFound();
});

//custom error handler
app.use(errorHandler);

const server = app.listen(config.port, function () {
  log.info("API server listening on " + config.port + "!");
});

export default app; // for testing
