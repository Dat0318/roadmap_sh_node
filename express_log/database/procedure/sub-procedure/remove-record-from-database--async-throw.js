const Article = require("../../type/Article");
const Category = require("../../type/Category");
const selectArticleById = require("../Article/select-by-id--async-throw");
const selectCategoryById = require("../Category/select-by-id--async-throw");
const findRecordFolderPathById = require("./find-record-folder-path-by-id--async-throw");
const fsPromises = require("fs/promises");
const path = require("path");

module.exports = async (
   in_typeName = Map.name,
   in_recordId = "Infinity",
   out_deleted = new Map()
) => {
   try {
      /* --- Cache the record before trying to delete */
      var theRecord = new Map();

      if (in_typeName == Article.name)
         await selectArticleById(in_recordId, theRecord);
      else if (in_typeName == Category.name)
         await selectCategoryById(in_recordId, theRecord);
      else
         throw new Error("Kiểu dữ liệu bản ghi không hợp lệ");

      /* --- Delete the record from database */
      var found = { recordFolderPath: "" };
      await findRecordFolderPathById(in_typeName, in_recordId, found);
      found.headerFilePath = path.join(found.recordFolderPath, "header.json");
      found.contentFilePath = path.join(found.recordFolderPath, "content.md");

      await fsPromises.rm(found.headerFilePath);
      await fsPromises.rm(found.contentFilePath);
      await fsPromises.rmdir(found.recordFolderPath);

      /* --- Populate the output */
      for (var entry of theRecord) {
         var [key, value] = entry;
         out_deleted.set(key, value);
      } // for
   }
   catch (error) {
      console.error(error);
   }
}; // module.exports
