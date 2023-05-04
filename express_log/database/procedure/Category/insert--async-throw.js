const Category = require("../../type/Category");
const generateNewRecordId = require("../sub-procedure/generate-new-record-id--async-throw");
const writeDataToRecordFolder = require("../sub-procedure/write-data-to-record-folder--async-throw");

module.exports = async (
   in_submitted = new Category(),
   out_inserted = new Category()
) => {
   try {
      /* --- generate new record's id */
      var generated = { recordId: null };
      await generateNewRecordId(Category.name, generated);

      /* --- populate output */
      Category.clone(in_submitted, out_inserted);
      out_inserted.set("@id", generated.recordId);

      /* --- write data to files */
      await writeDataToRecordFolder(Category.name, out_inserted);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
