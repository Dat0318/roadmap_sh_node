const express = require("express");
const router = express.Router();

router.use("/login", require("./action/login"));
router.use("/logout", require("./action/logout"));

module.exports = router;
