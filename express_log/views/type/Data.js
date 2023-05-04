const Data = class extends Map {
   constructor() {
      super();

      /* --- meta.ejs */
      this.set("title", "The Blog");

      /* --- topnav.ejs */
      this.set("logo-text"    , "L O G O")
          .set("category-list", []       );

      /* --- header.ejs */
      this.set("heading"    , "Tiêu đề chính")
          .set("description", "Giới thiệu ngắn về trang đơn...");

      /* --- main.ejs */
      this.set("entry-list", []);

      /* --- article/add.ejs */
      this.set("endpoint", "");

      return this;
   }
}; // Data

module.exports = Data;
