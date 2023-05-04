const databaseManager = require("../../database/manager");
const config = require("../../config");
const Category = require("../../database/type/Category");
const Data = require("../../views/type/Data");

/* --- */

module.exports = async (
   out_data = new Data()
) => {
   var logoText = config.get("logo-text");
   out_data.set("logo-text", logoText);

   var categoryList = [];
   await databaseManager.execute(
      Category.name, "select",
      categoryList, Infinity, "default", ["@id", "name"]
   );

   for (var category of categoryList) {
      var id = category.get("@id");
      category.set("url", `/category/views/${id}`);
   } // for .. of

   out_data.set("category-list", categoryList.slice(0, -1));

   out_data.set("topnav-action", "Viết Bài");
   out_data.set("topnav-endpoint", "/article/add");
};
