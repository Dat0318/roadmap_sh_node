const path = require("path");
const fsPromises = require("fs/promises");
const Article = require("../../type/Article");
const Category = require("../../type/Category");

module.exports = async (
   in_type = Map.name,
   in_record = new Map(),
   in_recordFolderPath = ""
) => {
   try {
      if (in_type == Article.name) { /* record type is valid */; }
      else if (in_type == Category.name) { /* record type is valid */; }
      else
         throw new Error("Kiểu dữ liệu bản ghi không hợp lệ.");

      var contentFilePath = path.join(in_recordFolderPath, "content.md");
      var recordContent = in_record.get("content");

      await fsPromises.writeFile(contentFilePath, recordContent);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
