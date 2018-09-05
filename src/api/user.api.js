var express = require('express');
var UserService = require('../service/User.s');

function restful(app, config) {
  this._app = app;
  this._config = config;
}

restful.prototype.api = function () {
  var _url = this._config.apiHeader;
  /* 登录 */
  this._app.post(_url + '/account/login', function (req, res, next) {
    new UserService(req.body).login(function (userData) {
      res.json(userData);
    });
  });
  /* 注册 */
  this._app.post(_url + '/account/register', function (req, res, next) {
    new UserService(req.body).register(function (userData) {
      res.json(userData);
    });
  });

  this._app.post(_url + '/account/updateUser', function (req, res, next) {
    new UserService(req.body).updateUser(function (userData) {
      res.json(userData);
    });
  });

  /*  */
  this._app.post(_url + '/account/getUsers', function (req, res, next) {
    new UserService(req.body).getUsers(function (userData) {
      res.json(userData);
    });
  });

  /*  */
  this._app.post(_url + '/account/getUserById', function (req, res, next) {
    new UserService(req.body).getUserById(function (userData) {
      res.json(userData);
    });
  });

  // getUserIdentity
  this._app.post(_url + '/account/getUserIdentity', function (req, res, next) {
    new UserService(req.body).getUserIdentity(function (userData) {
      res.json(userData);
    });
  });
}

module.exports = restful;
