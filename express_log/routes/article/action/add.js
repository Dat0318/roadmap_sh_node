const express = require("express");
const Data = require("../../../views/type/Data");
const getDataForTopnav = require("../../sub-procedure/get-data-for-topnav");
const getDataForArticle = require("../../sub-procedure/get-data-for-article");
const Article = require("../../../database/type/Article");
const databaseManager = require("../../../database/manager");

const router = express.Router();

/* --- Present Form */

router.get("/", async (request, response, next) => {
  var data = new Data();

  await getDataForTopnav(data);
  await getDataForArticle(data, "add");
  data.set("endpoint", "/article/add");

  response.render("index", {
    layout: "article",
    action: "add",
    data
  });
}); // router.get

/* --- Receive Submitted */

router.post("/", async (request, response, next) => {
  var entries = Object.entries(request.body);
  var submitted = new Article(entries);
  var inserted = new Article();

  await databaseManager.execute(
    Article.name, "insert",
    submitted, inserted
  );

  response.redirect(`/article/view/${inserted.get("@id")}`);
}); // router.post

module.exports = router;
