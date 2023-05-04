const express = require("express");
const router = express.Router();

router.all("/(:type)?(/:action)?(/:id)?", (request, response, next) => {
  var { session } = request.cookies;
  var { action } = request.params;

  if (session == "admin")
    next() /* go to main routers */;
  else
    if (["add", "edit", "delete"].includes(action))
      response.redirect("/admin/login");
    else
      next() /* go to main routers */;
}); // router.all

module.exports = router;
