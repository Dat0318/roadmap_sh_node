const Data = require("./views/type/Data");
const Category = require("./views/type/Category");
const Entry = require("./views/type/Entry");
const Article = require("./database/type/Article");

var data = new Data()

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
   TopNav
*/

var category1 = new Category()
  .set("@id", "01")
  .set("name", "Html")
  .set("url", "/category/view/01");

var category2 = new Category()
  .set("@id", "02")
  .set("name", "Css")
  .set("url", "/category/view/02");

var category3 = new Category()
  .set("@id", "03")
  .set("name", "Bootstrap")
  .set("url", "/category/view/03");

var category4 = new Category()
  .set("@id", "04")
  .set("name", "JavaScript")
  .set("url", "/category/view/04");

var category5 = new Category()
  .set("@id", "05")
  .set("name", "jQuery")
  .set("url", "/category/view/05");

var category6 = new Category()
  .set("@id", "06")
  .set("name", "NodeJS")
  .set("url", "/category/view/06");

var category7 = new Category()
  .set("@id", "07")
  .set("name", "ExpressJS")
  .set("url", "/category/view/07");


data.set("category-list", [
  category1,
  category2,
  category3,
  category4,
  category5,
  category6,
  category7
]);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
   Main
*/

var entry1 = new Entry()
  .set("title", "Bài Viết Thứ 1001")
  .set("excerpt", "Nội dung trích đoạn mở đầu bài viết thứ 1001 ...")
  .set("url", "/article/view/1000");

var entry2 = new Entry()
  .set("title", "Bài Viết Thứ 1000")
  .set("excerpt", "Nội dung trích đoạn mở đầu bài viết thứ 1001 ...")
  .set("url", "/article/view/999");

data.set("entry-list", [
  entry1,
  entry2
]);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
   Article - Edit
*/

var contentHTML = `
> "There is no one who wants pain itself, who seeks after it and  
> wants to have it, simply because they have been holding it along..." 

## What is Lorem Ipsum? 

Lorem Ipsum is simply dummy text of the printing and typesetting 
industry. Lorem Ipsum has been the industry's standard dummy text 
ever since the 1500s, when an unknown printer took a galley of type 
and scrambled it to make a type specimen book. It has survived not 
only five centuries, but also the leap into electronic typesetting, 
remaining essentially unchanged. It was popularised in the 1960s 
with the release of Letraset sheets containing Lorem Ipsum passages, 
and more recently with desktop publishing software like Aldus 
PageMaker including versions of Lorem Ipsum - 
[https://www.lipsum.com/](https://www.lipsum.com/) 
`; // contentHTML

var theArticle = new Article()
  .set("@id", "1001")
  .set("title", "Bài Viết Thứ 1001")
  .set("keywords", "lập trình web, hướng dẫn cơ bản")
  .set("content", contentHTML);

data.set("article", theArticle);
data.set("endpoint", "/article/edit");

module.exports = data;
