const databaseManager = require("../../database/manager");
const Article = require("../../database/type/Article");
const Data = require("../../views/type/Data");
const Entry = require("../../views/type/Entry");

/* --- */

module.exports = async (
   out_data = new Data(),
   in_layout = "home" /* home | category | admin */
) => {
   if (in_layout == "home")
      await getEntryListForHome(out_data);
   else
      throw new Error("Unsupported Layout");
};

/* --- */

const getEntryListForHome = async (
   out_data = new Data()
) => {
   var entryList = [];

   var articleList = [];
   await databaseManager.execute(
      Article.name, "select",
      articleList, 10, "reversed", ["@id", "title", "content"]
   );

   for (var article of articleList.slice(1)) {
      var entry = new Entry()
         .set("title", article.get("title"))
         .set("excerpt", article.get("content"))
         .set("url", `/article/views/${article.get("@id")}`);

      entryList.push(entry);
   } // for .. of

   out_data.set("entry-list", entryList);
};
