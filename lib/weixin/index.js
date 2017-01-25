var getWxUser = require('./getWXUserInfo.js')
var getWxId = require('./getWXUserId.js')

var wx = {
    getWeixinUserInfo : getWxUser,
    getWeixinUserId : getWxId
}

module.exports = wx
