var db = require('../../config/db/db');
var Utils = require('../../public/utils/formatData');
var parseJson = require('../../public/utils/json.callback');

var utils = new Utils();

function BlogService(params) {
    this._params = params;
}

BlogService.prototype.createArticle = function (callback) {
    this._params.create_at = utils.dateFormat().all;
    this._params.update_at = utils.dateFormat().all;
    var sql = 'insert into eye_articles values(id, ${title}$, ${content}$, ${markdown_content}$, ${user_id}$,' +
        ' ${like_number}$, ${comment_number}$, ${article_state}$, false, ${article_class_id}$, ${article_type_id}$, ${article_tag}$, ${create_at}$, ' +
        '${update_at}$)';

    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    console.log(sql);
    db.query(sql, [], function (results, fields) {
        console.log("创建文章响应结果---：", results);
        if (!results) {
            var error = parseJson.error({
                error_msg: '啊哦，创建文章失败了'
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

BlogService.prototype.deleteArticleById = function (callback) {
    var params = {
        id: this._params.article_id
    }
    var sql = 'update eye_articles set is_delete = true where id = ${id}$';
    var util = utils.stringAsEs6(params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (!results) {
            var error = parseJson.error({
                error_msg: '啊哦，删除失败了'
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

BlogService.prototype.updateArticle = function (callback) {
    this._params.update_at = utils.dateFormat().all;
    var sql = 'update eye_articles set title = ${title}$, content = ${content}$, markdown_content = ${markdown_content}$, article_state = ${article_state}$,' +
        ' is_delete = ${is_delete}$, article_class_id = ${article_class_id}$, article_type_id = ${article_type_id}$, article_tag = ${article_tag}$,' +
        ' update_at = ${update_at}$ WHERE id = ${article_id}$ and user_id = ${user_id}$';
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (!results) {
            var error = parseJson.error({
                error_msg: '啊哦，修改文章失败了'
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

BlogService.prototype.getArticleByParams = function (callback) {
    var page_size = this._params.page_size = this._params.page_size ? this._params.page_size : 10;
    var page = this._params.page = this._params.page ? (this._params.page - 1) * this._params.page_size : 0;
    var getCount = 'SELECT COUNT(*) as total_count FROM eye_articles where user_id = ${user_id}$ and is_delete = false';
    var getLists = ';SELECT' +
        ' art.id, art.title, art.content, art.markdown_content, art.user_id, art.like_number, art.comment_number, art.article_state, art.article_type_id, art.article_class_id, art.is_delete, art.article_tag, art.create_at,' +
        ' type.content as type_content, class.content as class_content' +
        ' FROM eye_articles as art, eye_article_type as type, eye_article_class as class where art.user_id = ${user_id}$ and art.is_delete = false and art.article_class_id = class.id and art.article_type_id = type.id';
    var limit = ' order by create_at desc limit ${page}$, ${page_size}$';
    if (this._params.article_class_id) {
        getCount = getCount + ' and article_class_id = ${article_class_id}$';
        getLists = getLists + ' and article_class_id = ${article_class_id}$';
    }
    if (this._params.article_type_id) {
        getCount = getCount + ' and article_type_id = ${article_type_id}$';
        getLists = getLists + ' and article_type_id = ${article_type_id}$';
    }
    if (this._params.title) {
        this._params.title = '%' + this._params.title + '%';
        getCount = getCount + ' and  title like ${title}$';
        getLists = getLists + ' and  title like ${title}$';
    }
    var sql = getCount + getLists + limit;
    var util = utils.stringAsEs6(this._params, sql, true);
    sql = util.data;
    console.log(sql);
    db.query(sql, [], function (results, fields) {
        if (!results || (results && results.length == 0)) {
            var error = parseJson.paging({
                error_msg: '哇哦，没有找到文章数据~~~',
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
                if (lists[i].article_state === 'PUBLIC') {
                    lists[i].article_state_name = '公开';
                } else {
                    lists[i].article_state_name = '私密';
                }
            }
        }

        callback(resultData);
    });
}

BlogService.prototype.getArticleById = function (callback) {

    var sql = 'SELECT' +
        ' art.id, art.title, art.content, art.markdown_content, art.user_id, art.like_number, art.comment_number, art.article_state, art.article_type_id, art.article_class_id, art.is_delete, art.article_tag, art.create_at,' +
        ' type.content as type_content, class.content as class_content' +
        ' FROM eye_articles as art, eye_article_type as type, eye_article_class as class where art.user_id = ${user_id}$ and art.id = ${article_id}$ and art.article_class_id = class.id and art.article_type_id = type.id';
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (results && results.length == 0) {
            var error = parseJson.error({
                error_msg: '啊哦。没有找到这篇文章',
                success: false
            })
            callback(error);
            return
        }
        var resultData = parseJson.map({
            result: results
        });
        
        if (resultData.result.article_state === 'PUBLIC') {
            resultData.result.article_state_name = '公开';
        } else {
            resultData.result.article_state_name = '私密';
        }
        callback(resultData);
    });
}

BlogService.prototype.createArticleType = function (callback) {
    this._params.create_at = utils.dateFormat().all;
    this._params.update_at = utils.dateFormat().all;
    var sql = 'insert into eye_article_type values (id, ${content}$, ${user_id}$, ${create_at}$, ${update_at}$)';
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (!results) {
            results.error_msg = "添加类型失败";
            results.success = false;
        } else {
            results.data = 1;
        }
        callback(results);
    });
}

BlogService.prototype.updateArticleType = function (callback) {
    this._params.update_at = utils.dateFormat().all;
    var sql = 'update eye_article_type set content = ${content}$, update_at = ${update_at}$ where id = ${type_id}$ and user_id = ${user_id}$';
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (!results) {
            var error = parseJson.error({
                error_msg: '啊哦，修改类型失败了'
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

BlogService.prototype.getArticleType = function (callback) {

    var sql = 'select * from eye_article_type where user_id = ${user_id}$ order by create_at desc';
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (results && results.length == 0) {
            var error = parseJson.error({
                error_msg: '啊哦。没有找到类型',
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

BlogService.prototype.deleteArticleType = function (callback) {
    var sql = 'delete from eye_article_type where id = ${type_id}$ user_id = ${user_id}$';
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (!results) {
            var error = parseJson.error({
                error_msg: '啊哦，删除类型失败了'
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

BlogService.prototype.createArticleClass = function (callback) {
    this._params.create_at = utils.dateFormat().all;
    this._params.update_at = utils.dateFormat().all;
    var sql = 'insert into eye_article_class values (id, ${content}$, ${user_id}$, ${create_at}$, ${update_at}$)';
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (!results) {
            var error = parseJson.error({
                error_msg: '啊哦，添加分类失败了'
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

BlogService.prototype.updateArticleClass = function (callback) {
    this._params.update_at = utils.dateFormat().all;
    var sql = 'update eye_article_class set content = ${content}$, update_at = ${update_at}$ where id = ${class_id}$ and user_id = ${user_id}$';
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (!results) {
            var error = parseJson.error({
                error_msg: '啊哦，修改分类失败了'
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

BlogService.prototype.getArticleClass = function (callback) {
    var sql = 'select * from eye_article_class where user_id = ${user_id}$ order by create_at desc';
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (results && results.length == 0) {
            var error = parseJson.error({
                error_msg: '啊哦。没有找到分类',
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

BlogService.prototype.deleteArticleClass = function (callback) {
    var sql = 'delete from eye_article_class where id = ${class_id}$ and user_id = ${user_id}$';
    var util = utils.stringAsEs6(this._params, sql);
    sql = util.data;
    db.query(sql, [], function (results, fields) {
        if (!results) {
            var error = parseJson.error({
                error_msg: '啊哦，删除分类失败了'
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

module.exports = BlogService;