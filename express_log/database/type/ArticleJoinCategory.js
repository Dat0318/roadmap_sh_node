const Article = require("./Article");
const Category = require("./Category");

const ArticleJoinCategory = class extends Map {
   constructor(...params) {
      super(...params);

      for (var key of ArticleJoinCategory.fieldNames) {
         if (this.has(key)) { /* do nothing */; }
         else
            this.set(key, null);
      } // for ... of

      return this;
   }

   static fieldNames = [
      // --- Article
      "@id",
      "title",
      "short-title",
      "keywords",
      "edited-datetime",
      "content",
      // --- Category
      "category-id",
      "category-name",
      "category-keywords",
      "category-content"
   ];

   static populate(
      in_article = new Article(),
      in_category = new Category(),
      out_joined = new ArticleJoinCategory()
   ) {
      for (var entry of in_article) {
         var [key, value] = entry;
         out_joined.set(key, value);
      }

      out_joined.set("category-name", in_category.get("name"))
         .set("category-keywords", in_category.get("keywords"))
         .set("category-content", in_category.get("content"));

      return ArticleJoinCategory;
   }
}; // ArticleJoinCategory

module.exports = ArticleJoinCategory;
