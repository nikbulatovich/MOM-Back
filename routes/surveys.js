const express = require("express");
const router = express.Router();
const { selectSurveys } = require("../db/surveys");

router.get("/", async (req, res) => {
  const surveys = await selectSurveys();
  res.send(surveys);
});

module.exports = router;
