const fsPromises = require("fs/promises");
const path = require("path");

module.exports = async (
   in_recordFolderPath = "",
   out_record = new Map()
) => {
   try {
      var contentFilePath = path.join(in_recordFolderPath, "content.md");
      var recordContent = await fsPromises.readFile(contentFilePath, { encoding: "utf-8" });
      out_record.set("content", recordContent);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
