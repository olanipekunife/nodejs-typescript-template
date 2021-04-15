import queue from "./";
import jobs from "./jobs";
import config from "../../config";
const concurrency = <number>config.workerConcurrency;
import log from "../logger";
import Model from "./Model";
// Sets the number of listeners to prevent the annoying memory leak error.
const maxListeners = concurrency * 20;
//queue.setMaxListeners(maxListeners);
import events from "events";

events.defaultMaxListeners = maxListeners;

queue.process("logRequest", concurrency, function (job, done) {
  jobs.createRequestLog(job.data, done);
});

queue.process("logResponse", concurrency, function (job, done) {
  jobs.updateRequestLog(job.data, done);
});

setTimeout(() => {
  Model.find({})
    .then(async function (jobs) {
      log.info("Starting Queue crons...");
      let repeatableJobs = await queue.getRepeatableJobs();
      log.warn("Current repeatable configs: removing.........", repeatableJobs);

      await Promise.all(
        repeatableJobs.map(
          async (job) => await queue.removeRepeatableByKey(job.key)
        )
      );

      repeatableJobs = await queue.getRepeatableJobs();
      log.warn(
        "Current repeatable configs: after removing.........",
        repeatableJobs
      );
      jobs.map((job) => {
        if (job.enabled) {
          log.info("Initializing " + job.name + "...");

          queue.add(job.job, job.arguments, {
            repeat: { cron: job.crontab },
          });
        }
      });
    })
    .catch(function (err) {
      log.error("An error occured while starting the queue cron: ", err);
    });
}, 10000);
export default queue;
