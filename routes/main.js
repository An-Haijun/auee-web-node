var config = require('../config/config');

// var app = express();
function main(app) {
    this._app = app;
    this._config = config;
}

main.prototype.route = function() {
    var indexRouter = require('../src/routes/index');
    var blogRouter = require('../src/routes/blog');
    var openSourceRouter = require('../src/routes/open-source');
    var userRouter = require('../src/routes/User.r');

    console.log("配置路由...");
    var _url = this._config.routeHeader;
    console.log(_url);
    /* 客户端路由 */
    this._app.use('/', indexRouter);
    this._app.use(_url, indexRouter);
    this._app.use(_url, blogRouter);
    this._app.use(_url, openSourceRouter);
    this._app.use(_url, userRouter);
}

main.prototype.api = function() {
    var userApi = require('../src/api/User.api');
    var blogApi = require('../src/api/blog.api');
    console.log("配置restful-api...");
    new userApi(this._app, this._config).api();
    new blogApi(this._app, this._config).api();
}

module.exports = main;

