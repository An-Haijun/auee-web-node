var UserService = require('../service/User.s');

function UserController(params, callback) {
    var sql = 'SELECT * FROM eye_users';
    UserService(sql, function (data) {
        callback(data);
    });
}

module.exports = UserController;
