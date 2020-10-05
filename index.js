const Agenda = require("agenda");
const Agendash = require("agendash");

const testJobFunction = require("./jobs/testJob");

const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/agenda-test";
const agenda = new Agenda({ db: { address: DB_URL } });

async function start() {
  agenda.on("ready", async function () {
    await agenda.start();
    console.log("Agenda is ready");

    agenda.schedule("1 minute", "test job", { test: "data" });
    agenda.schedule("1 minute", "test job", { test: "data", fail: true });
  });

  const gracefulShutdown = () => {
    console.log("Stopping agenda-test");
    agenda.stop(() => process.exit(0));
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);

  agenda.define("test job", testJobFunction);
}

start().catch(error => {
  console.error(error);
  process.exit(1);
});

const express = require("express");
const app = express();

app.use("/dash", Agendash(agenda));

app.listen(3002);
