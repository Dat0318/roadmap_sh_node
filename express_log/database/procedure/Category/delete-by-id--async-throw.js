const selectArticlesByCategoryId = require("../Article/select-by-category-id--async-throw");
const removeRecordFromDatabase = require("../sub-procedure/remove-record-from-database--async-throw");
const Category = require("../../type/Category");

module.exports = async (
   in_recordId = "Infinity",
   out_deleted = new Category()
) => {
   try {
      var selectedArticles = [];
      await selectArticlesByCategoryId(in_recordId, selectedArticles);
      var theCategoryContainsSomeArticles = (selectedArticles.length != 0);

      if (theCategoryContainsSomeArticles)
         throw new Error("Đang có bài viết thuộc danh mục này");
      else
         await removeRecordFromDatabase(Category.name, in_recordId, out_deleted);
   }
   catch (error) {
      throw error;
   }
}; // module.exports