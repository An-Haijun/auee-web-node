var mysql = require('mysql');
var databaseConfig = require('./db.config'); //引入数据库配置模块中的数据
//向外暴露方法
module.exports = {
    query: function (sql, params, callback, errCallback) {
        //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
        var connection = mysql.createConnection(databaseConfig);
        connection.connect(function (err) {
            if (err) {
                errCallback && errCallback(err);
                throw err;
            }
            //开始数据操作
            connection.query(sql, params, function (err, results, fields) {
                if (err) {
                    errCallback && errCallback(err, results, fields);
                    throw err;
                }
                callback && callback(results, fields);
                //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
                connection.end(function (err) {
                    if (err) {
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    }
};