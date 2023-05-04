const Article = require("./type/Article");
const Category = require("./type/Category");
const ArticleJoinCategory = require("./type/ArticleJoinCategory");
const fsPromises = require("fs/promises");
const path = require("path");
const pathToDataFolder = path.join(__dirname, "data");

const articleProcedure = new Map()
   .set("insert", require("./procedure/Article/insert--async-throw"))
   .set("select-by-id", require("./procedure/Article/select-by-id--async-throw"))
   .set("update", require("./procedure/Article/update--async-throw"))
   .set("delete-by-id", require("./procedure/Article/delete-by-id--async-throw"))
   .set("select-by-category-id", require("./procedure/Article/select-by-category-id--async-throw"))
   .set("select", require("./procedure/Article/select--async-throw"));

const categoryProcedure = new Map()
   .set("insert", require("./procedure/Category/insert--async-throw"))
   .set("select-by-id", require("./procedure/Category/select-by-id--async-throw"))
   .set("update", require("./procedure/Category/update--async-throw"))
   .set("delete-by-id", require("./procedure/Category/delete-by-id--async-throw"))
   .set("select", require("./procedure/Category/select--async-throw"));

const articleJoinCategoryProcedure = new Map()
   .set("select-by-id", require("./procedure/ArticleJoinCategory/select-by-id--async-throw"))
   .set("select", require("./procedure/ArticleJoinCategory/select--async-throw"));

const storedProcedure = new Map()
   .set(Article.name, articleProcedure)
   .set(Category.name, categoryProcedure)
   .set(ArticleJoinCategory.name, articleJoinCategoryProcedure);


const queryAllArticles = async function () {
   fsPromises
      .opendir(pathToDataFolder)
      .then(async function (dir) {
         for await (var dirEnt of dir) {
            console.log(dirEnt.name);
         } // for await
      })
      .catch(function (error) {
         console.error(error);
      });
}; // queryAllArticles

// module.exports = {
//    queryAllArticles
// };

exports.execute = async (
   typeName, procedureName,
   ...parameters
) => {
   await storedProcedure
      .get(typeName)
      .get(procedureName)
      .call(null, ...parameters);
}; // exports.execute
