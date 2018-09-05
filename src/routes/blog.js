var express = require('express');
var router = express.Router();
var utils = require('../../public/utils/formatData');

function blogRoute() {

}

/* GET home page. */
router.get('/blog', function (req, res, next) {
  var result = utils.prototype.dateFormat();
  var modle = [{
      date: Number(result.year) - 1,
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
    },
    {
      date: Number(result.year) - 3,
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
    },
    {
      date: Number(result.year) - 4,
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
    },
  ];
  res.render('blog/blog', {
    title: '博客',
    modle: modle
  });
});

module.exports = router;
