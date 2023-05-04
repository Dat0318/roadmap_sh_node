const ArticleView = require("../../view/Article");
const Article = require("../../type/Article");

module.exports = async (
   in_categoryId = "",
   out_selected = [],
   in_top = Infinity,
   in_order = "default", /* default | reversed */
   in_partial = Article.fieldNames
) => {
   try {
      /* --- Create view & index data */
      var view = new ArticleView();
      await ArticleView.indexData(view, in_order, in_partial)

      /* --- Loop & Select each record to check */
      for await (var record of view) {
         /* --- Limit the result set */
         if (out_selected.length == in_top)
            break /* out of the loop */;
         else { /* keep collecting record */; }

         /* --- Collect the Article if category-id matches */
         if (record.get("category-id") != in_categoryId) { /* record is not matched */; }
         else
            out_selected.push(record);
      } // for ... of
   }
   catch (error) {
      throw error;
   }
}; // module.exports
