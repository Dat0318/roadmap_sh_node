const express = require("express");
const router = express.Router();

router.use("/select-by-id", require("./procedure/select-by-id.js"));

module.exports = router;
