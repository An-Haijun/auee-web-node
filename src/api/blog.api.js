var express = require('express');
var UserService = require('../service/User.s');
var BlogService = require('../service/Blog.s');

function restful(app, config) {
  this._app = app;
  this._config = config;
}

restful.prototype.api = function () {
  var _url = this._config.apiHeader;
  /* 创建文章 */
  this._app.post(_url + '/article/create', function (req, res, next) {
    new BlogService(req.body).createArticle(function (data) {
      res.json(data);
    });
  });

  this._app.post(_url + '/article/deleteArticleById', function (req, res, next) {
    new BlogService(req.body).deleteArticleById(function (data) {
      res.json(data);
    });
  });

  this._app.post(_url + '/article/updateArticle', function (req, res, next) {
    new BlogService(req.body).updateArticle(function (data) {
      res.json(data);
    });
  });

  /* 按条件查询文章 */
  this._app.post(_url + '/article/getArticleById', function (req, res, next) {
    new BlogService(req.body).getArticleById(function (data) {
      res.json(data);
    });
  });

  /* 按条件查询文章 */
  this._app.post(_url + '/article/getArticleByParams', function (req, res, next) {
    new BlogService(req.body).getArticleByParams(function (data) {
      res.json(data);
    });
  });
  this._app.post(_url + '/article/createArticleType', function (req, res, next) {
    new BlogService(req.body).createArticleType(function (data) {
      res.json(data);
    });
  });
  this._app.post(_url + '/article/deleteArticleType', function (req, res, next) {
    new BlogService(req.body).deleteArticleType(function (data) {
      res.json(data);
    });
  });
  this._app.post(_url + '/article/updateArticleType', function (req, res, next) {
    new BlogService(req.body).updateArticleType(function (data) {
      res.json(data);
    });
  });
  /* 按条件查询文章类型 */
  this._app.post(_url + '/article/getArticleType', function (req, res, next) {
    new BlogService(req.body).getArticleType(function (data) {
      res.json(data);
    });
  });

  this._app.post(_url + '/article/createArticleClass', function (req, res, next) {
    new BlogService(req.body).createArticleClass(function (data) {
      res.json(data);
    });
  });
  this._app.post(_url + '/article/deleteArticleClass', function (req, res, next) {
    new BlogService(req.body).deleteArticleClass(function (data) {
      res.json(data);
    });
  });
  this._app.post(_url + '/article/updateArticleClass', function (req, res, next) {
    new BlogService(req.body).updateArticleClass(function (data) {
      res.json(data);
    });
  });
  /* 按条件查询文章分类 */
  this._app.post(_url + '/article/getArticleClass', function (req, res, next) {
    new BlogService(req.body).getArticleClass(function (data) {
      res.json(data);
    });
  });
}

module.exports = restful;
