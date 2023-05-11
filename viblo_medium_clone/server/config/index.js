var Sequelize = require('sequelize');

var sequelize = new Sequelize(database, username, password, {
  dialect: 'sqlite',
  // dùng trong trường hợp SQLite
  storage: __dirname + '/basic-sqlite-database.sqlite',
});

sequelize.sync().then(function () {
  console.log('Every thing is synced');
});

var db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
