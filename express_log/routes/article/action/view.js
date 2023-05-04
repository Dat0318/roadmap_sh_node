const express = require("express");
const Data = require("../../../views/type/Data");
const getDataForMeta = require("../../sub-procedure/get-data-for-meta");
const getDataForTopnav = require("../../sub-procedure/get-data-for-topnav");
const getDataForArticle = require("../../sub-procedure/get-data-for-article");
const oopsRouter = require("../../oops");

const router = express.Router();

router.get("/:id", async (request, response, next) => {
  var { id } = request.params;
  var data = new Data();

  try {
    await getDataForMeta(data, "article", "view", id);
    await getDataForTopnav(data);
    await getDataForArticle(data, "view", id);
  }
  catch (error) {
    return oopsRouter(request, response, next);
  }

  response.render("index", {
    layout: "article",
    action: "view",
    data
  });
}); // router.get

module.exports = router;
