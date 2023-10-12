'use strict';
const jwt = require('jsonwebtoken');
const _CONST = require('../config/constant');

var self = (module.exports = {
  checkLogin: (req, res, next) => {
    console.log('middleware req.session.user>>', req.session.user);
    if (req.session.user) {
      return next();
    }
    return res.redirect('/login');
  },
  checkToken: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, _CONST.SECRET, function (err, decoded) {
        if (err) {
          console.error(err.toString());
          //if (err) throw new Error(err)
          return res.status(401).json({ error: true, message: 'Unauthorized access.', err });
        }
        console.log(`decoded>>${decoded}`);
        req.decoded = decoded;
        next();
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
        error: true,
        message: 'No token provided.',
      });
    }
  },
});
