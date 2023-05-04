const databaseManager = require("../../database/manager");
const Article = require("../../database/type/Article");
const Category = require("../../database/type/Category");
const Data = require("../../views/type/Data");
const marked = require("marked");

/* --- */

module.exports = async (
   in_data = new Data(),
   in_action = "view",  /* view | add | edit */
   in_id = "Infinity"
) => {
   if (in_action == "view")
      await getArticle(in_data, in_id);
   else if (in_action == "add")
      await getCategoryList(in_data);
   else
      throw new Error("Unsupported action type");
};

/* --- */

const getArticle = async (
   out_data = new Data(),
   in_id = "Infinity"
) => {
   var selected = new Article();
   await databaseManager.execute(
      Article.name, "select-by-id",
      in_id, selected
   );

   var contentMarkdown = selected.get("content");
   var contentHTML = marked.parse(contentMarkdown);
   selected.set("content", contentHTML);

   out_data.set("article", selected);
};

/* --- */

const getCategoryList = async (
   out_data = new Data()
) => {
   var categoryList = [];
   await databaseManager.execute(
      Category.name, "select",
      categoryList
   );

   out_data.set("category-list", categoryList);
};