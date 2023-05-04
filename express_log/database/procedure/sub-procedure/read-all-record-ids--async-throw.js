const readAllRecordFolderNames = require("./read-all-record-folder-names--async-throw");

module.exports = async (
   in_typeName = Map.name,
   out_allRecordIds = []
) => {
   try {
      /* --- collect all records' folder names */
      var allRecordFolderNames = [];
      await readAllRecordFolderNames(in_typeName, allRecordFolderNames);

      /* --- extract ids from folder names */
      for (var folderName of allRecordFolderNames) {
         var recordId = folderName.match(/(id-)(\w+)/).pop();
         out_allRecordIds.push(recordId);
      } // for
   }
   catch (error) {
      throw error;
   }
}; // module.exports
