const express = require("express");
const router = express.Router();

router.use("/select", require("./procedure/select.js"));

module.exports = router;
