const Article = require("../../type/Article");
const Category = require("../../type/Category");
const path = require("path");
const fsPromises = require("fs/promises");

module.exports = async (
   in_type = Map.name,
   in_record = new Map(),
   in_recordFolderPath = ""
) => {
   try {
      var headerJSON = new Object();

      if (in_type == Article.name)
         Article.populateHeaderJSON(in_record, headerJSON);
      else if (in_type == Category.name)
         Category.populateHeaderJSON(in_record, headerJSON);
      else
         throw new Error("Kiểu dữ liệu bản ghi không hợn lệ");

      var headerText = JSON.stringify(headerJSON);
      var headerFilePath = path.join(in_recordFolderPath, "header.json");

      await fsPromises.writeFile(headerFilePath, headerText);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
