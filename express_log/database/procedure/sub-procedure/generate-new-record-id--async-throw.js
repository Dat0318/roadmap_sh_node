const Article = require("../../type/Article");
const Category = require("../../type/Category");
const readAllRecordIds = require("./read-all-record-ids--async-throw");

module.exports = async (
   in_typeName = Map.name,
   out_generated = { recordId: null }
) => {
   try {
      /* --- collect all ids */
      var allRecordIds = [];
      await readAllRecordIds(in_typeName, allRecordIds);

      /* --- generate new id */
      var latestRecordId = allRecordIds.slice(0, -1).pop();
      var newRecordIdNumber = Number(latestRecordId) + 1;

      if (in_typeName == Article.name)
         out_generated.recordId = String(newRecordIdNumber).padStart(4, "0");
      else if (in_typeName == Category.name)
         out_generated.recordId = String(newRecordIdNumber).padStart(2, "0");
      else
         throw new Error("Kiểu dữ liệu bản ghi không được hỗ trợ");
   }
   catch (error) {
      throw error;
   }
}; // module.exports
