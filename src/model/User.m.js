var Utils = require('../../public/utils/formatData');
var utils = new Utils();

function UserModel(params) {
    this._id = params.user_id ? params.user_id : 0;
    this._username = params.user_name ? params.user_name : '';
    this._password = params.password ? params.password : '';
    this._mobile = params.mobile ? params.mobile : '';
    this._email = params.email ? params.email : '';
    this._userIdentityId = params.user_identity_id ? params.user_identity_id : '';
    this._isDisabled = params.is_disabled ? params.is_disabled : '';
    this._createAt = params.create_at ? params.create_at : utils.dateFormat().all;
    this._updateAt = params.update_at ? params.update_at : utils.dateFormat().all;
}

UserModel.prototype.getId = function () {
    return this._id;
}
UserModel.prototype.getUsername = function () {
    return this._username;
}
UserModel.prototype.getPassword = function () {
    return this._password;
}
UserModel.prototype.getMobile = function () {
    return this._mobile;
}
UserModel.prototype.getEmail = function () {
    return this._email;
}
UserModel.prototype.getUserIdentityId = function () {
    return this._userIdentityId;
}
UserModel.prototype.getIsDisabled = function () {
    return this._isDisabled;
}
UserModel.prototype.getCreateAt = function () {
    return this._createAt;
}
UserModel.prototype.getUpdateAt = function () {
    return this._updateAt;
}

module.exports = UserModel;