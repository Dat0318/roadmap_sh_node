const writeDataToRecordFolder = require("../sub-procedure/write-data-to-record-folder--async-throw");
const Article = require("../../type/Article");

module.exports = async (
   in_record = new Article(),
   out_updated = new Article()
) => {
   try {
      Article.clone(in_record, out_updated);
      await writeDataToRecordFolder(Article.name, in_record);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
