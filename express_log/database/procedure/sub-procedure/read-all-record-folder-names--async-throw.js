const fsPromises = require("fs/promises");
const path = require("path");

module.exports = async (
   in_typeName = Map.name,
   out_allRecordFolderNames = []
) => {
   try {
      var dataFolderPath = path.join(__dirname, "../../data", in_typeName);
      var dir = await fsPromises.opendir(dataFolderPath);

      for await (var dirEnt of dir) {
         out_allRecordFolderNames.push(dirEnt.name);
      } // for
   }
   catch (error) {
      throw error;
   }
}; // module.exports
