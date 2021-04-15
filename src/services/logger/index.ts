import log from "winston";
import config from "../../config";
import response from "../response";
import { Loggly } from "winston-loggly-bulk";
if (config.env === "production") {
  if (!config.logglyToken) {
    log.add(
      new log.transports.File({
        filename:
          "app-" + new Date().toDateString().split(" ").join("_") + ".log",
        level: "warn",
      })
    );
    log.remove(log.transports.Console);
  } else {
    if (config.logglyToken) {
      log.add(
        new Loggly({
          token: config.logglyToken,
          subdomain: config.logglySubdomain,
          tags: [config.logglyTag],
          json: true,
          level: "warn",
        })
      );
    }
    log.add(
      new log.transports.File({
        filename:
          "app-" + new Date().toDateString().split(" ").join("_") + ".log",
        level: "warn",
      })
    );
    log.remove(log.transports.Console);
  }
} else {
  log.add(new log.transports.Console({ level: "debug" }));
}

export default log;
export const errorHandler = (err, req, res, next): void => {
  response(req, res, next);
  log.error(err);
  if (err.statusCode === 404) {
    res.notFound(err);
  } else if (err.statusCode === 401) {
    res.unAuthorized(err);
  } else if (err.statusCode === 400) {
    res.badRequest(err);
  } else if (err.statusCode === 403) {
    res.forbidden(err);
  } else if (err.statusCode === 422) {
    res.unProcessable(err);
  } else {
    res.serverError(err);
  }
};
// ToDo: Test Error Handler
