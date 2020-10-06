const express = require("express");
const router = express.Router();

const agenda = require("./agenda");

router.post("/jobs", async (req, res) => {
  const job = await agenda.schedule("2 minutes", "test-job", {
    number: Math.random(),
  });
  return res.json({ status: "ok", job });
});

module.exports = router;
