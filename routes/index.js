const express = require("express");
const router = express.Router();

router.use("/surveys", require("./surveys"));
router.use("/answers", require("./answers"));
router.use("/questionnaires", require("./questionnaires"));
router.use("/results", require("./results"));
router.use("/persons", require("./persons"));

module.exports = router;
