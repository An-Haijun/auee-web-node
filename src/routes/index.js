var express = require('express');
var router = express.Router();
var app = express();
var utils = require('../../public/utils/formatData');

/* GET home page. */
app.get('/', function (req, res, next) {
  var result = utils.prototype.dateFormat();
  var modle = [
    {
      date: Number(result.year) - 1,
      innerItems: [
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        }
      ]
    },
    {
      date: Number(result.year) - 2,
      innerItems: [{
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        },
        {
          name: '一起来学习node',
          date: result.all
        }
      ]
    }
  ];

  res.render('index/index', {
    title: '首页',
    modle: modle
  });
});

module.exports = app;
