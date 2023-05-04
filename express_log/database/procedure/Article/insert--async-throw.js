const Article = require("../../type/Article");
const generateNewRecordId = require("../sub-procedure/generate-new-record-id--async-throw");
const writeDataToRecordFolder = require("../sub-procedure/write-data-to-record-folder--async-throw");

module.exports = async (
   in_submitted = new Article(),
   out_inserted = new Article()
) => {
   try {
      /* --- generate new record's id */
      var generated = { recordId: null };
      await generateNewRecordId(Article.name, generated);

      /* --- populate output */
      Article.clone(in_submitted, out_inserted);
      out_inserted.set("@id", generated.recordId);

      /* --- write data to files */
      await writeDataToRecordFolder(Article.name, out_inserted);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
