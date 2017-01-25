var wxDataCrypt = require('./wxDataCrypt/');
var co = require('co');
var thunkify = require('thunkify');
var request = require('request');

function getData(param, res){ 

    var appId = 'wxe41ec6799091842a';
    var secretKey = 'f1e7ecc246c7f0b6a0304c739b47870d';
    var host = "https://api.weixin.qq.com/sns/jscode2session?appid="+appId+"&secret="+secretKey+"&js_code="+param.code+"&grant_type=authorization_code";
    
    var _data = "", data = "";
    
    co(function* (){

        _data = yield thunkify(request.get)(host)

        var login = JSON.parse(_data[0].body)

        var pc = new wxDataCrypt(appId, login.session_key)

        var data = pc.decryptData(param.encryptedData , param.iv)

        console.log('解密后 data: ', data)

        res.send(data)

    }).catch(function(e){
        console.log(e);
    })

}

module.exports = getData
