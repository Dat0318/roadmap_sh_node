const express = require("express");
const Data = require("../views/type/Data");
const getDataForMeta = require("./sub-procedure/get-data-for-meta");
const getDataForTopnav = require("./sub-procedure/get-data-for-topnav");
const getDataForArticle = require("./sub-procedure/get-data-for-article");

const router = express.Router();

router.get("*", async (request, response, next) => {
  var data = new Data();

  try {
    await getDataForMeta(data, "oops", "view", "Infinity");
    await getDataForTopnav(data);
    await getDataForArticle(data, "view", "Infinity");
  }
  catch (error) {
    console.error(error);
  }

  response.status(404).render("index", {
    layout: "oops",
    action: "view",
    data
  });
}); // router.get

module.exports = router;
