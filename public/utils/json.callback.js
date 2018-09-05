var Utils = require('./formatData');
var utils = new Utils();

function setMap(options) {
    if (!options) {
        console.error("params can't null");
        return
    }
    var resolve = {}
    resolve.success = options.success || true;
    resolve.error_code = options.error_code || 0;
    resolve.error_msg = options.error_msg || '';
    options.result = options.result && _formatDate(options.result);
    resolve.result = options.result && options.result[0] || '';
    resolve.timestamp = utils.dateFormat().all;
    return resolve;
}

function setLists(options) {
    if (!options) {
        console.error("params can't null");
        return
    }
    var resolve = {}
    resolve.success = options.success || true;
    resolve.error_code = options.error_code || 0;
    resolve.error_msg = options.error_msg || '';
    resolve.result = options.result || [];
    resolve.result = resolve.result && _formatDate(resolve.result);
    resolve.timestamp = utils.dateFormat().all;
    return resolve;
}

function setPaging(options) {
    if (!options) {
        console.error("params can't null");
        return
    }
    var resolve = {}
    resolve.success = options.success || true;
    resolve.error_code = options.error_code || 0;
    resolve.error_msg = options.error_msg || '';
    resolve.result = {};
    if (options.result) {
        var lists = options.result[1],
            total_count = options.result[0][0]['total_count'],
            total_page = total_count / options.page_size;
        if (total_page.toString().indexOf('.') > 0) {
            total_page = parseInt(total_page) + 1;
        }
        resolve.result.list = lists;
        resolve.result.list = resolve.result.list && _formatDate(resolve.result.list);
        resolve.result.total_count = total_count;
        resolve.result.total_page = total_page;
        resolve.result.current_page = options.page;
        resolve.result.is_next = true;
        console.log(resolve, '-----');
        if (lists.length < options.page_size) {
            resolve.result.is_next = false;
        }
    } else {
        resolve.result = ''
    }
    resolve.timestamp = utils.dateFormat().all;
    return resolve;
}

function error(options) {
    var resolve = {
        success: false,
        error_code: '0',
        error_msg: '系统错误',
        result: ''
    }

    if (options) {
        resolve.success = options.success || false;
        resolve.error_code = options.error_code || 1;
        resolve.error_msg = options.error_msg || '系统错误';
        resolve.result = '';
    }
    resolve.timestamp = utils.dateFormat().all;
    return resolve;
}

function _formatDate(items) {
    if (items && items.length != 0) {
        var length = items.length;
        for (var i = 0; i < length; i++) {
            items[i].create_at = utils.dateFormat(items[i].create_at).all;
            items[i].update_at = utils.dateFormat(items[i].update_at).all;
            if (items[i].is_delete == '0') {
                items[i].is_delete = false;
            } else {
                items[i].is_delete = true;
            }
        }
        return items;
    }else{
        return items
    }
}

var parseJson = {
    map: setMap,
    lists: setLists,
    paging: setPaging,
    error: error
}



module.exports = parseJson;