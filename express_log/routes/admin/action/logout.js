const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
  response.clearCookie("session");
  response.redirect("/");
});

module.exports = router;
