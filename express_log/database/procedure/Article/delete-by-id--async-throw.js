const removeRecordFromDatabase = require("../sub-procedure/remove-record-from-database--async-throw");
const Article = require("../../type/Article");

module.exports = async (
   in_recordId = "Infinity",
   out_deleted = new Article()
) => {
   try {
      await removeRecordFromDatabase(Category.name, in_recordId, out_deleted);
   }
   catch (error) {
      throw error;
   }
}; // module.exports