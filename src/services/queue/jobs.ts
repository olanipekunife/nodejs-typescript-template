import log from "../logger";
import IRequestLogs from "../../interfaces/requestlogs";
import RequestLogs from "../../models/requestlogs";

import queue from ".";

interface Jobs {
  createRequestLog: (request: any, done: (err, value?) => void) => void;
  updateRequestLog: (request: any, done: (err, value?) => void) => void;
}
const jobs = <Jobs>{};

// Logs all API requests
jobs.createRequestLog = function (request, done) {
  log.info("logging API request: ", request.RequestId);
  RequestLogs.create(request)
    .then(function (res: IRequestLogs) {
      return done(false, res.RequestId || res + " request log created");
    })
    .catch(function (err) {
      log.error(err);
      return done({ statusCode: 422, message: err });
    });
};

// Logs all API responses
jobs.updateRequestLog = function (response, done) {
  log.info("logging API response: ", response.requestId);
  const requestId = response.requestId;
  if (response && response.requestId) {
    delete response.requestId;
  }
  RequestLogs.updateOne({ RequestId: requestId }, response)
    .then(function (res: any) {
      return done(false, res.requestId || res + " request log updated");
    })
    .catch(function (err) {
      log.error(err);
      return done({ statusCode: 422, message: err });
    });
};

export default jobs;
