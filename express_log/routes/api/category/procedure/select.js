const express = require("express");
const router = express.Router();
const databaseManager = require("../../../../database/manager");
const ArticleJoinCategory = require("../../../../database/type/ArticleJoinCategory");

router.get("*", async (request, response) => {
   var { top, order, offset } = request.query;

   var selected = [];
   await databaseManager.execute(
      ArticleJoinCategory.name, "select",
      selected, Number(top), order, [...ArticleJoinCategory.fieldNames], Number(offset)
   );

   for (var article of selected) {
      var id = article.get("@id");
      article.set("url", `/article/${id}`);
   } // for .. of

   for (var index in selected) {
      var article = selected[index];
      selected[index] = Object.fromEntries(article);
   } // for .. in

   response.json(selected);
}); // router.get

module.exports = router;
