const Agenda = require("agenda");

const jobs = require("./jobs");

const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/agenda-test";
const agenda = new Agenda({ db: { address: DB_URL } });

const start = async () => {
  agenda.on("ready", async () => {
    await agenda.start();
    console.log("Agenda is ready");
  });

  const gracefulShutdown = async () => {
    console.log("Stopping agenda-test");
    await agenda.stop();
    console.log("Stopped agenda-test");
    process.exit(0);
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);

  jobs.forEach(job => {
    agenda.define(job.jobName, job.jobFn);
  });
};

module.exports = (() => {
  start().catch(error => {
    console.error(error);
    process.exit(1);
  });

  return agenda;
})();
