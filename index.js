const express = require("express");
const Agendash = require("agendash");

const app = express();
const PORT = 3002;

const agenda = require("./agenda");
const api = require("./api");

app.use("/dash", Agendash(agenda));
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Agenda dashboard listening in port ${PORT}`);
});
