const Article = class extends Map {
   constructor() {
      super();

      this.set("title", "Tiêu đề bài viết")
          .set("content", "Nội dung đầy đủ của bài viết...")
          .set("edited-datetime", new Date().toString());

      return this;
   }
}; // Article

module.exports = Article;
