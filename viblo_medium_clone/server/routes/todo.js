// server/routes/todo.js
const todoController = require('./../controllers/todo.ctrl');
const multipart = require('connect-multiparty');
const multipartWare = multipart();

module.exports = (router) => {
  /**
   * get all todos
   */
  router.route('/todos').get(todoController.getAll);
  /**
   * add an todo
   */
  router.route('/todo').post(multipartWare, todoController.addTodo);
  /**
   * comment on an todo
   */
  router.route('/todo/comment').post(todoController.commentTodo);
  /**
   * get a particular todo to view
   */
  router.route('/todo/:id').get(todoController.getTodo);
  /**
   * delete a particular todo to view
   */
  router.route('/todo/:id').delete(todoController.deleteTodo);
  /**
   * update a particular todo to view
   */
  router.route('/todo/:id').put(todoController.updateTodo);
};
