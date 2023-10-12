'use strict';
const _CONST = require('../config/constant');
const login_model = require('../models/login_model');
const md5 = require('md5');
var jwt = require('jsonwebtoken');

var refreshTokens = {}; // tao mot object chua nhung refreshTokens

var self = (module.exports = {
  function_register: async (obj) => {
    //insert vao login collection
    const _obj = {
      email: obj.email,
      password: md5(obj.password),
    };
    return login_model.create(_obj);
  },
  function_login: async (obj) => {
    //login collection
    const { username, password } = obj;

    const login = await login_model.findOne({
      email: email,
      password: md5(password),
    });

    if (login) {
      const user = {
          username: username,
          role: 'admin',
        },
        token = jwt.sign(user, _CONST.SECRET, { expiresIn: _CONST.tokenLife }), //20 giay
        refreshToken = jwt.sign(user, _CONST.SECRET_REFRESH, {
          expiresIn: _CONST.refreshTokenLife,
        }),
        response = {
          status: 'Logged in',
          token: token,
          refreshToken: refreshToken,
        };

      refreshTokens[refreshToken] = response;

      return res.json(response);
    }
    return res.json({ status: 'success', elements: 'Login failed!!!' });
  },
  function_token: async (obj) => {
    const { refreshToken } = obj;
    // if refresh token exists
    if (refreshToken && refreshToken in refreshTokens) {
      const token = jwt.sign(
          {
            username: 'anonystick.com',
            role: 'admin',
          },
          _CONST.SECRET,
          { expiresIn: _CONST.tokenLife }
        ),
        response = { token };

      // update the token in the list
      refreshTokens[refreshToken].token = token;
      res.status(200).json(response);
    } else {
      res.status(404).send('Invalid request');
    }
  },
});
