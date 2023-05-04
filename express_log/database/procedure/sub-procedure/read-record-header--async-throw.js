const fsPromises = require("fs/promises");
const path = require("path");

module.exports = async (
   in_recordFolderpath = "",
   out_record = new Map()
) => {
   try {
      var headerFilePath = path.join(in_recordFolderpath, "header.json");
      var headerText = await fsPromises.readFile(headerFilePath, { encoding: "utf-8" });
      var headerObject = JSON.parse(headerText);
      var headerEntries = Object.entries(headerObject);

      for (var entry of headerEntries) {
         var [key, value] = entry;
         out_record.set(key, value);
      } // for
   }
   catch (error) {
      throw error;
   }
}; // module.exports
