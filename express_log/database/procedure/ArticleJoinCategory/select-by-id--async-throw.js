const ArticleJoinCategory = require("../../type/ArticleJoinCategory");
const Article = require("../../type/Article");
const Category = require("../../type/Category");
const selectArticleById = require("../Article/select-by-id--async-throw");
const selectCategoryById = require("../Category/select-by-id--async-throw");

module.exports = async (
   in_recordId = "Infinity",
   out_selected = new ArticleJoinCategory(),
   in_partial = ArticleJoinCategory.fieldNames
) => {
   try {
      var selectedArticle = new Article();
      await selectArticleById(in_recordId, selectedArticle);

      var categoryId = selectedArticle.get("category-id");
      var selectedCategory = new Category();
      await selectCategoryById(categoryId, selectedCategory);

      ArticleJoinCategory.populate(
         selectedArticle,
         selectedCategory,
         out_selected
      );

      for (var entry of out_selected) {
         var [key, value] = entry;

         if (in_partial.includes(key)) { /* keep this field */; }
         else
            out_selected.delete(key);
      } // for ... of
   }
   catch (error) {
      throw error;
   }
}; // module.exports
