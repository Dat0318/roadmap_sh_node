const ArticleJoinCategory = require("../../type/ArticleJoinCategory");
const Article = require("../../type/Article");
const readAllRecordIds = require("../sub-procedure/read-all-record-ids--async-throw");
const selectRecordById = require("../ArticleJoinCategory/select-by-id--async-throw");

module.exports = async (
   out_selected = [],
   in_top = Infinity,
   in_order = "default", /* default | reversed */
   in_partial = ArticleJoinCategory.fieldNames,
   in_offset = 0
) => {
   /* --- Collect all records' ids */
   var allRecordIds = [];
   await readAllRecordIds(Article.name, allRecordIds);

   /* --- Order id-list */
   if (in_order == "default") { /* keep default order */; }
   else
      allRecordIds.reverse();

   var offset = -1;
   /* --- Loop & Select each record to check */
   for (var recordId of allRecordIds) {
      offset += 1;
      if (offset < in_offset)
         continue /* to next cycle */;
      else { /* collect the record */; }

      /* --- Limit the result set */
      if (out_selected.length == in_top)
         break /* out of the loop */;
      else { /* keep collecting record */; }

      /* --- Select a record */
      var record = new ArticleJoinCategory();
      await selectRecordById(recordId, record, in_partial);
      out_selected.push(record);
   } // for .. of
};
