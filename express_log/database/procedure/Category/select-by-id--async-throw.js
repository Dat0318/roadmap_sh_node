const findRecordFolderPathById = require("../sub-procedure/find-record-folder-path-by-id--async-throw");
const readRecordHeader = require("../sub-procedure/read-record-header--async-throw");
const readRecordContent = require("../sub-procedure/read-record-content--async-throw");
const Category = require("../../type/Category");

module.exports = async (
   in_recordId = "Infinity",
   out_selected = new Category(),
   in_partial = Category.fieldNames
) => {
   try {
      /* --- find record's folder path */
      var found = { recordFolderPath: "" };
      await findRecordFolderPathById(Category.name, in_recordId, found);

      /* --- read record's header and content */
      await readRecordHeader(found.recordFolderPath, out_selected);
      await readRecordContent(found.recordFolderPath, out_selected);

      /* --- remove unwanted fields */
      for (var entry of out_selected) {
         var [key, value] = entry;

         if (in_partial.includes(key)) { /* keep this field */; }
         else
            out_selected.delete(key);
      } // for
   }
   catch (error) {
      throw error;
   }
}; // module.exports
