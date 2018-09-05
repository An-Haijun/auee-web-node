function utils(){
    console.log('放飞吧，你的灵魂！');
}

/**
 * 日期格式化
 * @param {日期：2018-08-08 23:05:05} val 
 */
utils.prototype.dateFormat = function(val) {
    var datestr = new Date();
    if(val || typeof val === 'string') {
        datestr = new Date(val);
    }
    var dates = {}
    nowDate();
    function nowDate() {
        dates.year = this.year = datestr.getFullYear();
        dates.month = this.month = datestr.getMonth() + 1;
        dates.date = this.date = datestr.getDate();
        dates.day = this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[datestr.getDay()];
        dates.hour = this.hour = datestr.getHours() < 10 ? "0" + datestr.getHours() : datestr.getHours();
        dates.minute = this.minute = datestr.getMinutes() < 10 ? "0" + datestr.getMinutes() : datestr.getMinutes();
        dates.second = this.second = datestr.getSeconds() < 10 ? "0" + datestr.getSeconds() : datestr.getSeconds();
        dates.all = this.year + "-" + this.month + "-" + this.date + " " + this.hour + ":" + this.minute + ":" + this.second;
    }
    return dates;
}
/**
 * 
 * @param {*} map 
 * @param {*} val 
 * @param { 转移方式：默认都存在值不予赋值、存在空值赋值true } haveNull
 */
utils.prototype.stringAsEs6 = function (map, val, haveNull) {
    // var str = val.split();
    var str = val;
    var re = /\${(.*?)}\$/g;
    var array = [];
    while (temp = re.exec(str)) {
        array.push(temp[0])
    }
    var data = str;
    for (var k = 0; k < array.length; k++) {
        var key = array[k].replace('${', "").replace("}$", "");
        var value = map[key];
        setData();
        function setData() {
            
            value = value.toString().indexOf("'") > 0?value.toString().replace(/'/g, '"') : value;
            if (typeof value === 'string') {
                value = "'" + value + "'";
            }
            data = data.replace(array[k], value);
        }
    }
    var result = {
        init: str,
        data: data
    }
    return result;
}

module.exports = utils;