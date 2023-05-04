const ArticleView = require("../../view/Article");
const Article = require("../../type/Article");

module.exports = async (
   out_selected = [],
   in_top = Infinity,
   in_order = "default", /* default | reversed */
   in_partial = Article.fieldNames,
   in_offset = 0
) => {
   try {
      /* --- Create view & Index data */
      var view = new ArticleView();
      await ArticleView.indexData(view, in_order, in_partial)

      var index = -1;
      /* --- Loop & Collect records */
      for await (var record of view) {
         index += 1;

         if (index < in_offset)
            continue /* check next record */;
         else
            if (out_selected.length == in_top)
               break /* out of the loop */;
            else
               out_selected.push(record);
      } // for .. of
   }
   catch (error) {
      throw error;
   }
}; // module.exports
