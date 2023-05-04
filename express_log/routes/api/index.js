const express = require("express");
const router = express.Router();

router.use("/article", require("./article/index.js"));

module.exports = router;
