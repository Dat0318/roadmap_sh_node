const Entry = class extends Map {
   constructor() {
      super();

      this.set("title", "Tiêu đề bài viết")
          .set("excerpt", "Đoạn văn bản nội dung ngắn...")
          .set("url", "#");

      return this;
   }

   set(key, value) {
      if (key == "excerpt")
         super.set(key, `${value.slice(0, 321)}...`);
      else
         super.set(key, value);

      return this;
   }
}; // Entry

module.exports = Entry;
