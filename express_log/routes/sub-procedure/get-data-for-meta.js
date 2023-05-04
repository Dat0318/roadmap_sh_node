const databaseManager = require("../../database/manager");
const Article = require("../../database/type/Article");
const Data = require("../../views/type/Data");
const config = require("../../config");

/* --- */

module.exports = async (
   out_data = new Data(),
   in_layout = "home",  /* home | category | article | admin | oops */
   in_action = "view",  /* view | add | edit | login */
   in_id = "Infinity"
) => {
   if (in_layout == "home")
      getMetaForHome(out_data);
   else if (["article", "oops"].includes(in_layout))
      await getMetaForArticle(out_data, in_action, in_id);
   else
      throw new Error("Unsupported layout");
};

/* --- */

const getMetaForHome = /* procedure */ (
   out_data = new Data()
) => {
   var logoText = config.get("logo-text");
   out_data.set("title", `${logoText} | Trang Chủ`);
};

/* --- */

const getMetaForArticle = async (
   out_data = new Data(),
   in_action = "view",  /* view | add | edit */
   in_id = "Infinity"
) => {
   var maybeUnpublished = new Article();
   await databaseManager.execute(
      Article.name, "select-by-id",
      in_id, maybeUnpublished
   );

   if (["view", "add", "edit"].includes(in_action))
      out_data.set("title", maybeUnpublished.get("title"));
   else
      throw new Error("Unsupported action type");
};