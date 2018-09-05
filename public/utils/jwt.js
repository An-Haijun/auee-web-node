var fs = require('fs');
var path = require('path');
var jwt = require('jsonwebtoken');

function Jwt(data) {
    this._data = data.data;
    this._usedtime = data.usedtime;
}

Jwt.prototype.generateToken = function() {
    var data = this._data;
    var created = Math.floor(Date.now() / 1000);
    var cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_private_key.pem'));
    var token = jwt.sign({
        data,
        exp: created + 60 * Number(this._usedtime)
    }, cert, {algorithm: 'RS256'});
    return token;
}

// 校验token
Jwt.prototype.verifyToken = function() {
    var token = this._data;
    var cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_public_key.pem')); //公钥 可以自己生成
    var res;
    try {
        if (!token) {
            res = 'noToken';
            return res;
        }
        var result = jwt.verify(token, cert, {
            algorithms: ['RS256']
        }) || {};
        var exp = result? result.exp : 0,
            current = Math.floor(Date.now() / 1000);
        
        if (current <= exp) {
            res = result.data || {};
        }
    } catch (e) {
        res = 'err';
    }
    return res;
}

module.exports = Jwt;