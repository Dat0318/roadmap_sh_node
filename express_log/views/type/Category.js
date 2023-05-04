const Category = class extends Map {
   constructor() {
      super();

      this.set("@id", "")
          .set("name", "")
          .set("url" , "");

      return this;
   }
}; // Category

module.exports = Category;
