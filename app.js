var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var JwtUtil = require('./public/utils/jwt');
var parseJson = require('./public/utils/json.callback');

var Main = require('./routes/main');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'views')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'node_modules')));
console.log("服务器运行中...");

app.use(function (req, res, next) {
  // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
  console.log(req.url);
  if (req.url != '/api/blog/account/login' && req.url != '/api/blog/account/register') {
    var token = req.headers.token;
    console.log(req.headers);
    var jwt = new JwtUtil(token);
    var result = jwt.verifyToken();
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
      var resultData = parseJson.error({
        success: false,
        error_code: 7,
        error_msg: '登录已过期,请重新登录'
      })
      res.json(resultData);
      // res.render('login.html');
    } else if (result == "noToken") {
      var resultData = parseJson.error({
        success: false,
        error_code: 7,
        error_msg: '站住，请出示你的token'
      })
      res.json(resultData);
    } else {
      next();
    }
  } else {
    next();
  }
});

/* 配置客户端路由,http请求 api */
var main = new Main(app);
main.route();
main.api();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
