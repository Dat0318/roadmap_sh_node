const readAllRecordFolderNames = require("./read-all-record-folder-names--async-throw")
const path = require("path")

module.exports = async (
   in_typeName = Map.name,
   in_recordId = "Infinity",
   out_found = { recordFolderPath: "" }
) => {
   try {
      var allRecordFolderNames = []
      await readAllRecordFolderNames(in_typeName, allRecordFolderNames)

      /* search for matched folder name */
      var matchedFolderName = ""
      for (var folderName of allRecordFolderNames) {
         if (folderName.includes(in_recordId))
            matchedFolderName = folderName;
         else
            continue /* searching */;
      } // for

      /* populate output path if found matched */
      if (matchedFolderName == "") { /* do nothing */; }
      else
         out_found.recordFolderPath = path.join(
            __dirname, "../../data", in_typeName, matchedFolderName
         ); // out_found
   }
   catch (error) {
      throw error
   }
} // module.exports
