const express = require("express");
const Data = require("../../../views/type/Data");
const getDataForTopnav = require("../../sub-procedure/get-data-for-topnav");
const credential = require("../../../credential");

const router = express.Router();

/* --- Show login page */
router.get("/", async (request, response) => {
  var data = new Data();
  await getDataForTopnav(data);
  data.set("endpoint", "/admin/login");

  response.render("index.ejs", {
    layout: "admin",
    action: null,
    data
  });
});

/* --- Handle login submit */
router.post("/", (request, response) => {
  var { username, password } = request.body;
  var usernameMatched = (username == credential.get("username"));
  var passwordMatched = (password == credential.get("password"));
  var loginMatched = (usernameMatched && passwordMatched);

  if (loginMatched) {
    response.cookie("session", "admin", { httpOnly: true });
    response.redirect("/");
  }
  else {
     /* ask user to login again */;
    response.redirect("/admin/login");
  }
}); // router.post

module.exports = router;
