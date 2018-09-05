var db = require('../../config/db/db');
var Utils = require('../../public/utils/formatData');
var UserModel = require('../model/User.m');
var parseJson = require('../../public/utils/json.callback');
var Jwt = require('../../public/utils/jwt');
var utils = new Utils();
var userModel = function () {};
// 30分钟过期
var usedtime = 300;

function UserService(params) {
    this._params = params;
    if (params) {
        userModel = new UserModel(this._params);
    }
}

UserService.prototype.login = function (callback) {
    var params = {
        user_name: userModel.getUsername(),
        password: userModel.getPassword()
    }
    var sql = 'select u.id, u.name, u.user_name, u.user_identity_id, ( select type from eye_identity where id = u.user_identity_id ) as identity_type, u.is_disabled from eye_users as u ' +
        'where user_name = ${user_name}$ and password= ${password}$ and is_delete = 0';
    var util = utils.stringAsEs6(params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (results && results.length == 0) {
            var error = parseJson.error({
                error_code: 404,
                error_msg: '用户名或密码错误'
            });
            callback(error);
            return
        }

        var resultData = parseJson.map({
            result: results
        });
        var jwt = new Jwt({
            data: resultData.result.id,
            usedtime: usedtime
        });
        resultData.result.token = jwt.generateToken();
        if (parseInt(resultData.result.is_disabled) == '1') {
            var data = parseJson.error({
                error_code: 403,
                error_msg: '你的账户已被冻结,需向管理员申请解冻'
            });
            callback(data);
            return
        }

        resultData.usedtime = usedtime * 60 * 1000;
        callback(resultData);
    }, function (error) {
        var data = parseJson.error();
        callback(data);
    });
}

UserService.prototype.getUserById = function (callback) {
    var params = {
        user_id: userModel.getId(),
    }
    var sql = 'select u.id, u.name, u.user_name, u.mobile, u.email, u.intro, u.user_identity_id, ( select type from eye_identity where id = u.user_identity_id ) as identity_type from eye_users as u ' +
        'where id = ${user_id}$';
    var util = utils.stringAsEs6(params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (results && results.length == 0) {
            var error = parseJson.error({
                error_msg: '啊哦，没有找到该用户',
                success: false
            })
            callback(error);
            return
        }
        var resultData = parseJson.map({
            result: results
        });


        callback(resultData);
    });
}

UserService.prototype.register = function (callback) {
    this._params.create_at = utils.dateFormat().all;
    this._params.update_at = utils.dateFormat().all;

    var sql = 'insert into eye_users (name, user_name, password, mobile, email, intro, user_identity_id, is_disabled, is_delete, create_at, update_at)' +
        ' values(${name}$, ${user_name}$, ${password}$, ${mobile}$, ${email}$, ${intro}$, ${user_identity_id}$, false, false, ${create_at}$, ${update_at}$)';
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (!results) {
            var error = parseJson.error({
                error_msg: '啊哦，创建用户失败了'
            });
            callback(error);
            return
        }
        var resultData = parseJson.map({
            result: 1
        });
        callback(resultData);
    });
}

UserService.prototype.updateUser = function (callback) {
    this._params.update_at = utils.dateFormat().all;
    var header = 'update eye_users set';
    var where = ' update_at = ${update_at}$ where id = ${user_id}$';
    if (typeof this._params.is_disabled == 'boolean') {
        header = header + ' is_disabled = ${is_disabled}$,';
    }
    if (typeof this._params.is_delete == 'boolean') {
        header = header + ' is_delete = ${is_delete}$,';
    }
    if (this._params.user_name) {
        header = header + ' user_name = ${user_name}$,';
    }
    if (this._params.password) {
        header = header + ' password = ${password}$,';
    }
    if (this._params.mobile) {
        header = header + ' mobile = ${mobile}$,';
    }
    if (this._params.email) {
        header = header + ' email = ${email}$,';
    }
    if (this._params.user_identity_id) {
        header = header + ' user_identity_id = ${user_identity_id}$,';
    }
    if (this._params.intro) {
        header = header + ' intro = ${intro}$,';
    }
    sql = header + where;
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    console.log(sql);
    db.query(sql, [], function (results, fields) {
        if (!results) {
            var error = parseJson.error({
                error_msg: '啊哦，修改用户信息失败了'
            });
            callback(error);
            return
        }
        var resultData = parseJson.map({
            result: 1
        });
        callback(resultData);
    });
}

UserService.prototype.getUsers = function (callback) {
    var page_size = this._params.page_size = this._params.page_size ? this._params.page_size : 10;
    var page = this._params.page = this._params.page ? (this._params.page - 1) * this._params.page_size : 0;
    var getCount = 'SELECT COUNT(*) as total_count FROM eye_users as u where user_identity_id = ${user_identity_id}$ and is_delete = 0';
    var getLists = ';SELECT' +
        ' u.id, u.name, u.user_name,u.mobile,u.email,u.user_identity_id, u.is_disabled ,iden.content as identity_content, u.create_at from eye_users as u, eye_identity as iden' +
        ' where u.user_identity_id = ${user_identity_id}$ and u.user_identity_id = iden.id and is_delete = 0';
    if (this._params.name && this._params.user_name) {
        this._params.name = '%' + this._params.name + '%';
        this._params.user_name = '%' + this._params.user_name + '%';
        getCount = getCount + " and (u.name like ${name}$ or u.user_name like ${user_name}$)";
        getLists = getLists + " and (u.name like ${name}$ or u.user_name like ${user_name}$)";
    }
    var limit = ' order by u.create_at desc limit ${page}$, ${page_size}$';
    var sql = getCount + getLists + limit;
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    console.log(sql);
    db.query(sql, [], (results, fields) => {
        if (!results || (results && results.length == 0)) {
            var error = parseJson.paging({
                error_msg: '哇哦，没有找到用户数据~~~',
                success: false
            })
            callback(error);
            return
        }
        var resultData = parseJson.paging({
            result: results,
            page: page + 1,
            page_size: page_size
        });

        var lists = resultData.result.list;

        if (lists && lists.length != 0) {
            var length = lists.length;
            for (var i = 0; i < length; i++) {
                if (parseInt(lists[i].is_delete) == 0) {
                    lists[i].is_delete = false;
                } else {
                    lists[i].is_delete = true;
                }
            }
        }

        callback(resultData);

    });
}

UserService.prototype.getUserIdentity = function (callback) {
    var sql = 'select *, (select count(*) from eye_users as users where users.user_identity_id = iden.id and users.is_delete = 0) as user_count from eye_identity as iden' +
        ' where type != "super"';
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    console.log(sql);
    db.query(sql, [], function (results, fields) {
        if (results && results.length == 0) {
            var error = parseJson.error({
                error_msg: '啊哦。没有找到用户身份',
                success: false
            })
            callback(error);
            return
        }
        var resultData = parseJson.lists({
            result: results
        });

        callback(resultData);
    });
}

module.exports = UserService;