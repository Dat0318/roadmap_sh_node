const db = require('../config');
var Sequelize = require('sequelize');

var Todo = db.define('todo', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 255],
    },
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

function createTodo({ description }) {
  Todo.create({
    description,
  })
    .then(function (todo) {
      console.log(todo);
    })
    .catch(function (e) {
      console.log(e);
    });
}

module.exports = {
  Todo,
};
