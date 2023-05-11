/** server/controllers/todo.ctrl.js*/
const db = require('../config');
const Todo = require('../models/Todo');
const User = require('../models/User');
const cloudinary = require('cloudinary');

module.exports = {
  addTodo: (req, res, next) => {
    let { text, title, claps, description } = req.body;
    if (req.files.image) {
      cloudinary.uploader.upload(
        req.files.image.path,
        (result) => {
          let obj = {
            text,
            title,
            claps,
            description,
            feature_img: result.url != null ? result.url : '',
          };
          saveArticle(obj);
        },
        {
          resource_type: 'image',
          eager: [{ effect: 'sepia' }],
        }
      );
    } else {
      saveArticle({ text, title, claps, description, feature_img: '' });
    }
    function saveArticle(obj) {
      new Article(obj).save((err, article) => {
        if (err) res.send(err);
        else if (!article) res.send(400);
        else {
          return article.addAuthor(req.body.author_id).then((_article) => {
            return res.send(_article);
          });
        }
        next();
      });
    }
  },
  getAll: (req, res, next) => {
    var query = req.query,
      where = {};

    if (query.hasOwnProperty('completed') && query.completed == 'true') {
      where.completed = true;
    } else if (query.hasOwnProperty('completed') && query.completed == 'false') {
      where.completed = false;
    }

    if (query.hasOwnProperty('search') && query.search.length > 0) {
      where.description = {
        $like: '%' + query.search + '%',
      };
    }

    db.todo
      .findAll({ where: where })
      .then(function (todos) {
        res.json(todos);
      })
      .catch(function (e) {
        res.status(500).json(e);
      });
  },
  /**
   * article_id
   */
  clapTodo: (req, res, next) => {
    // Article.findById(req.body.article_id)
    //   .then((article) => {
    //     return article.clap().then(() => {
    //       return res.json({ msg: 'Done' });
    //     });
    //   })
    //   .catch(next);
  },
  /**
   * comment, author_id, article_id
   */
  commentTodo: (req, res, next) => {
    // Article.findById(req.body.article_id)
    //   .then((article) => {
    //     return article
    //       .comment({
    //         author: req.body.author_id,
    //         text: req.body.comment,
    //       })
    //       .then(() => {
    //         return res.json({ msg: 'Done' });
    //       });
    //   })
    //   .catch(next);
  },
  /**
   * article_id
   */
  getTodo: (req, res, next) => {
    var todoId = parseInt(req.params.id, 10);
    db.todo
      .findById(todoId)
      .then(function (todo) {
        if (todo) {
          res.json(todo.toJSON());
        } else {
          res.status(404).send(); // lỗi không tìm thấy todo
        }
      })
      .catch(function (e) {
        res.status(500).json(e); // something went wrong
      });
  },
  deleteTodo: (req, res, next) => {
    var todoId = parseInt(req.params.id, 10);

    db.todo
      .destroy({ where: { id: todoId } })
      .then(function (rowsDeleted) {
        if (rowsDeleted == 0) {
          res.status(404).json({
            error: 'no todo found with that id',
          });
        } else {
          res.status(204).send();
        }
      })
      .catch(function (e) {
        res.status(500).json(e);
      });
  },
  updateTodo: (req, res) => {
    var body = _.pick(req.body, 'description', 'completed');
    var attributes = {};

    var todoId = parseInt(req.params.id, 10);

    if (body.hasOwnProperty('completed')) {
      attributes.completed = body.completed;
    }

    if (body.hasOwnProperty('description')) {
      attributes.description = body.description;
    }

    db.todo.findById(todoId).then(
      function (todo) {
        if (todo) {
          todo.update(attributes).then(
            function (todo) {
              res.json(todo.toJSON());
            },
            function (e) {
              res.status(400).json(e);
            }
          );
        } else {
          res.status(404).send();
        }
      },
      function (e) {
        res.status(500).send();
      }
    );
  },
};
