import mongoose from "mongoose";
import config from "../config";
import log from "../services/logger";
import { Promise as qPromise } from "q";
function makeNewConnection(uri: string) {
  (<any>mongoose).Promise = qPromise;

  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  db.on("error", (error) => log.error(error));
  db.once("open", function () {
    log.info("mongoDB database connection successful " + uri.split("/").pop());
  });

  db.on("disconnected", function () {
    log.info(`MongoDB :: disconnected`);
  });

  return db;
}

const mainConnection = makeNewConnection(config.mongoURL);
const logConnection = makeNewConnection(config.logMongoURL);

export { mainConnection, logConnection };
