const express = require("express");
const Data = require("../views/type/Data");
const getDataForMeta = require("./sub-procedure/get-data-for-meta");
const getDataForTopnav = require("./sub-procedure/get-data-for-topnav");
const getDataForHeader = require("./sub-procedure/get-data-for-header");
const getDataForEntry = require("./sub-procedure/get-data-for-entry");

const router = express.Router();

router.get("/", async (request, response) => {
  var data = new Data();

  await getDataForMeta(data, "home");
  await getDataForTopnav(data);
  await getDataForHeader(data, "home");
  await getDataForEntry(data, "home");

  response.render("index", {
    layout: "home",
    action: null,
    data
  });
}); // router.get

module.exports = router;
