const express = require("express");
const router = express.Router();
const { getResults } = require("../db/results");

router.get("/results", async (req, res) => {
  let results = await getResults();
  res.send(results.rows);
});

module.exports = router;
