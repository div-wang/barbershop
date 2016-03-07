var express = require('express')
var sql = require('./sql.js')
var extend = require('./extend.js')
var path = require('path')
var fs = require('fs')
var app = express()

var getData = function (op){

    // 设置根目录
    op.root = path.normalize(__dirname+'/..')+op.root

    // 设置静态访问根目录
    app.use(express.static(op.root))

    //设置跨域访问
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
        res.header("Access-Control-Allow-Methods","POST,GET")
        res.header("Content-Type", "application/json;charset=utf-8")
        getOutput(op, req, res)
    });

    // 监听端口
    app.listen(op.port)
    console.log('listen to 127.0.0.1:'+op.port)


}

// 处理ajax请求
var getOutput = function (op, req, res){

    var path = req.path.replace(/(^\/*)/g, ''),
        param = req.query||req.body;

    //判断登陆用户名密码
    if(path === 'login'){
        var data = ''
        if(param.userName == 'admin' && param.password == '123456'){
            data = {
                rCode:2000,
                rMsg:'success',
                cookie:'div'+(new Date()).getTime()
            }
        }else{
            data = {
                rCode:-1,
                rMsg:'用户名或密码不正确'
            }
        }
        res.send(data)
    }

    //查询会员卡信息
    if(path === 'queryCardAll'){
        if(param.cardType==0&&!param.name&&!param.phone){
            sql.queryAll('card',res).success(function(data,res){
                res.send(data)
            }).fail(function(data,res){
                res.send(data)
            })
        }else{
            sql.queryList(param,res,'card').success(function(data,res){
                res.send(data)
            }).fail(function(data,res){
                res.send(data)
            })
        }
    }
    
    //查询会员信息
    if(path === 'queryPersonAll'){
        if(param.cardType==0&&param.name==''&&param.phone==''){
            sql.queryAll('person',res).success(function(data,res){
                res.send(data)
            }) 
        }else{
            sql.queryList(param,res,'person').success(function(data,res){
                res.send(data)
            })  
        }
    }

}

module.exports = getData
