
const Article = require("./database/type/Article");
const path = require("path");
const Category = require("./database/type/Category");
const databaseManager = require("./database/manager");

void async function () {
   console.log("==========");
   await databaseManager.execute(
      Category.name, "insert",
      "a-new-category", "inserted"
   );

   console.log("==========");
   await databaseManager.execute(
      Category.name, "select-by-id",
      "id-00", "selected"
   );

   console.log("==========");
   await databaseManager.execute(
      Category.name, "update",
      "a-category", "updated"
   );

   console.log("==========");
   await databaseManager.execute(
      Category.name, "delete-by-id",
      "id-00", "deleted"
   );
}(); // void

// var selected = new Article();

// databaseManager.queryAllArticles();


// await databaseManager.execute(
//    selected.name,   /* kiểu bản ghi */
//    "select-by-id",   /* tên thủ tục  */
//    "0001",   /* tham số id   */
//    selected   /* nhận kết quả */
// );
