const findRecordFolderPathById = require("../sub-procedure/find-record-folder-path-by-id--async-throw");
const readRecordHeader = require("../sub-procedure/read-record-header--async-throw");
const readRecordContent = require("../sub-procedure/read-record-content--async-throw");
const Article = require("../../type/Article");

module.exports = async (
   in_recordId = "Infinity",
   out_selected = new Article(),
   in_partial = Article.fieldNames
) => {
   try {
      /* --- find record's folder path */
      var found = { recordFolderPath: "" };
      await findRecordFolderPathById(Article.name, in_recordId, found);

      /* --- read record's header and content */
      await readRecordHeader(found.recordFolderPath, out_selected);
      await readRecordContent(found.recordFolderPath, out_selected);

      /* --- remove unwanted fields */
      for (var key of out_selected.keys()) {
         if (in_partial.includes(key)) { /* keep this field */; }
         else
            out_selected.delete(key);
      } // for
   }
   catch (error) {
      throw error;
   }
}; // module.exports
