var express = require('express');
var router = express.Router();
var app = express();
var utils = require('../../public/utils/formatData');

var UserController = require('../controller/User.c');

/* GET home page. */
router.get('/user-all', function (req, res, next) {
    UserController(null, function (userData) {
        res.json(userData);
    });
});

module.exports = router;
