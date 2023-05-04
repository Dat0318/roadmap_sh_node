const Article = class extends Map {
   constructor(...params) {
      super(...params);

      for (var key of Article.fieldNames) {
         if (this.has(key)) { /* do nothing */; }
         else
            this.set(key, null);
      } // for .. of

      return this;
   }

   static fieldNames = [
      "@id",
      "title",
      "short-title",
      "keywords",
      "edited-datetime",
      "category-id",
      "content"
   ];

   static clone(
      in_source = new Article(),
      out_target = new Article()
   ) {
      for (var entry of in_source) {
         var [key, value] = entry;
         out_target.set(key, value);
      }

      return Article;
   }

   static populateHeaderJSON(
      in_source = new Article(),
      out_headerJSON = new Object()
   ) {
      for (var entry of in_source) {
         var [key, value] = entry;

         if (key == "content") { /* don't take content */; }
         else
            out_headerJSON[key] = value;
      } // for .. of

      return Article;
   }
}; // Article

module.exports = Article;
