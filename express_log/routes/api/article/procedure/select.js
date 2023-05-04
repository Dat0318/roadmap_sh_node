const express = require("express");
const router = express.Router();
const databaseManager = require("../../../../database/manager");
const Article = require("../../../../database/type/Article");

router.get("*", async (request, response) => {
   var { top, order, offset } = request.query;

   var selected = [];
   await databaseManager.execute(
      Article.name, "select",
      selected, Number(top), order, [...Article.fieldNames], Number(offset)
   );

   for (var i = 0; i < selected.length; i += 1) {
      var articleObject = Object.fromEntries(selected[i]);
      selected[i] = articleObject;
   }

   response.json(selected);
}); // router.get

module.exports = router;
