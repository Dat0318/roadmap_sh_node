const writeDataToRecordFolder = require("../sub-procedure/write-data-to-record-folder--async-throw");
const Category = require("../../type/Category");

module.exports = async (
   in_record = new Category(),
   out_updated = new Category()
) => {
   try {
      Category.clone(in_record, out_updated);
      await writeDataToRecordFolder(Category.name, in_record);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
