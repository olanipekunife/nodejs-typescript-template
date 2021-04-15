import config from "../../config";
import Queue from "bull";

//recognize real stucked jobs
//queue.lockRenewTime = 60 * 1000; // 1min

const queue = new Queue("background workers", config.redisURL, {
  settings: { lockRenewTime: 60 * 1000 },
});
import log from "../logger";
import Model from "./Model";

// Clean Up Completed Job
queue
  .on("waiting", function (jobId) {
    // A Job is waiting to be processed as soon as a worker is idling.
    log.info("Job %s waiting to be processed ", jobId);
  })
  .on("completed", async (job, result) => {
    log.info(`Job ID: ${job.id}, " Result: ${result}`);
    try {
      const jobbed = await queue.getJob(job.id);
      if (jobbed) {
        await jobbed.remove();
        log.info(`removed completed job ${job.id}`);
      }
    } catch (error) {
      throw false;
    }
  })
  .on("failed", function (job, err) {
    log.error("job " + job.id + " in queue failed... " + err);
  })
  .on("error", function (err) {
    log.error("Queue Error... " + err);
  })
  .on("stalled", function (job) {
    log.info(
      `stalled job, restarting it again! ${job.queue.name} ${job.data} ${job.id}`
    );
  });

const shutdown = async (signal) => {
  try {
    log.error(signal);
    const repeatableJobs = await queue.getRepeatableJobs();
    // log.warn('Current repeatable configs: ', repeatableJobs);

    await Promise.all(
      repeatableJobs.map(
        async (job) => await queue.removeRepeatableByKey(job.key)
      )
    );
    log.warn("Queue shutting down: ");
    await queue.close();

    process.exit(0);
  } catch (error) {
    log.error(error);

    process.exit(0);
  }
};

// Graceful Shutdown
process.once("SIGTERM", shutdown);

// Handle uncaughtExceptions
process.once("uncaughtException", shutdown);

// // Pull Jobs out of stuck state
// queue.watchStuckJobs(1000);

// Process Jobs Here
export default queue;
//module.exports.kue = kue;
export function addSchedule(crontab, name, job, data, enabled): void {
  Model.updateOne(
    { job },
    { crontab, name, job, arguments: data, enabled },
    { upsert: true }
  )
    .then(function () {
      // Silencio es dorado
    })
    .catch(function (err) {
      log.error("Error scheduling job - ", err);
    });
}
