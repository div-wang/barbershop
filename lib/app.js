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
        getOutput(req, res)
    });
    
    // 监听端口
    app.listen(op.port)
    console.log('listen to 127.0.0.1:'+op.port)

}

// 处理ajax请求
var getOutput = function (req, res){

    var path = req.path.replace(/(^\/*)/g, ''),
        param = req.query||req.body;
    
    // res.status(404).send('<h1>Not 404</h1>');
    // res.status(500).send('<h1>Not 404</h1>');
    //判断登陆用户名密码
    if(path === 'loging'){
        var data = ''
        if(param.userName == 'admin' && param.password == '123456'){
            data = {
                rCode:2000,
                rMsg:'success',
                cookie:'admin_'+(new Date()).getTime()
            }
        }else{
            data = {
                rCode:-1,
                rMsg:'用户名或密码不正确'
            }
        }
        res.send(data)
        return
    }

    //查询会员卡信息
    if(path === 'queryCardAll'){
        sql.queryList(param,res).success(function(data,res){
            res.send(data)
        }).fail(function(data,res){
            res.send(data)
        })
        return
    }
    
    //创建会员卡信息
    if(path === 'addCard'){
        sql.addCard(param,res).success(function(data,res){
            res.send(data)
        }) 
        return
    }

    //查询会员卡信息
    if(path === 'getCard'){
        sql.getCard(param,res).success(function(data,res){
            res.send(data)
        }) 
        return
    }

    //查询会员的记录信息
    if(path === 'getRecord'){
        sql.getRecord(param,res).success(function(data,res){
            res.send(data)
        }) 
        return
    }

    //增加会员的消费记录信息
    if(path === 'addRecord'){
        sql.addRecord(param,res).success(function(data,res){
            res.send(data)
        }) 
        return
    }
    
    //查询会员卡信息
    if(path === 'upCard'){
        sql.upCard(param,res).success(function(data,res){
            res.send(data)
        }) 
        return
    }

    var src = path=='/'?'dist/index.html':'dist/'+path+'.html'
    router(src,res)
    
}

var router = function(src, res){
    fs.readFile(src, 'utf8', (err, data) => {
        res.set('Content-Type', 'text/html');
        if (err) {
            res.status(404).send('<h1>Not 404</h1>');
        } else {
            res.send(data)
        }
    });
}

module.exports = getData
