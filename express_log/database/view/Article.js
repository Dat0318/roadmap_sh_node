const readAllRecordId = require("../procedure/sub-procedure/read-all-record-ids--async-throw");
const selectArticleById = require("../procedure/Article/select-by-id--async-throw");
const Article = require("../type/Article");

const ArticleView = class {
   /* --- Index data into the view instance */
   static async indexData(
      out_instance = new ArticleView(),
      in_order = "default", /* default | reversed */
      in_partial = Article.fieldNames
   ) {
      /* --- Initialize allRecordIds */
      out_instance.allRecordIds = [];
      await readAllRecordId(Article.name, out_instance.allRecordIds);

      /* --- Order the id-list (if needed) */
      if (in_order == "default") { /* keep the order */; }
      else
         out_instance.allRecordIds.reverse();

      /* --- Initialize fieldNames */
      out_instance.fieldNames = in_partial;

      return ArticleView;
   }

   /* --- Provide iterator method */
   async *[Symbol.asyncIterator]() {
      for (var recordId of this.allRecordIds) {
         var selected = new Article();
         await selectArticleById(recordId, selected, this.fieldNames);
         yield selected;
      } // for .. of
   }
}; // ArticleView

module.exports = ArticleView;
