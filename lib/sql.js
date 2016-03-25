var mysql = require('mysql')
var db = require('./db.js')
var defer = require('./defer.js')

// 使用连接池，提升性能
var pool  = mysql.createPool(db.mysql);

var reRows = function(rows,count,page){
    if(rows&&count&&page) {
        return {
            rCode: 2000,
            rMsg: 'success',
            data: rows,
            total: count[0].count,
            pageNum: parseInt(page)+1
        }
    }else if(rows){
        return {
            rCode: 2000,
            rMsg: 'success',
            data: rows
        }
    }else{
        return {
            rCode: 2004,
            rMsg: 'error'
        }
    }
}
var onErr = function(err,defer){
    if(err){
        console.log(err) 
        defer.reject(err)
    }
}
var data = {}
var mysqlTest = {
    getCard: function(param,res){
        var d = defer(res);
        pool.getConnection(function(err, connection) {    
            onErr(err,d)
            var sql = db.select + ' where a.id=' + connection.escape(parseInt(param.id))
            console.log(sql);
            connection.query(sql, function(err, rows) {
                onErr(err,d)
                d.resolve(reRows(rows))
                // 释放连接 
                connection.release()
            });    
        });
        return d.promise;
    },
    addCard: function(params,res){
        var d = defer(res);
        pool.getConnection(function(err, connection) {    
            onErr(err,d)
            console.log(db.card.insert);
            connection.query(db.card.insert, [params.cardNo, params.type, params.num, params.total, params.date], function(err, rows) {
                onErr(err,d)
                console.log(db.person.insert);
                connection.query(db.person.insert, [params.name, params.sex, params.birth, params.phone, params.cardNo], function(err, rows) {
                    onErr(err,d)
                    d.resolve(reRows(rows))
                    // 释放连接 
                    connection.release()
                });  
            });    
        });
        return d.promise;
    },
    upCard: function(params,res){
        var d = defer(res);
        pool.getConnection(function(err, connection) {    
            onErr(err,d)
            console.log(db.card.update);
            connection.query(db.card.update, [params.type, params.num, params.total, params.id], function(err, rows) {
                onErr(err,d)
                console.log(db.person.update);
                connection.query(db.person.update, [params.name, params.sex, params.birth, params.phone, params.id], function(err, rows) {
                    onErr(err,d)
                    d.resolve(reRows(rows))
                    // 释放连接 
                    connection.release()
                });  
            });    
        });
        return d.promise;
    },
    getRecord: function(param,res){
        var d = defer(res);
        pool.getConnection(function(err, connection) {    
            onErr(err,d)
            var sql = db.recording.selectId + connection.escape(parseInt(param.id))
            console.log(sql);
            connection.query(sql, function(err, rows) {
                onErr(err,d)
                var newSql = db.recording.selectNo + rows[0].cardNo
                console.log(newSql);
                connection.query(newSql, function(err, rows1) {
                    onErr(err,d)
                    d.resolve(reRows(rows1))
                    // 释放连接 
                    connection.release()
                });  
            });    
        });
        return d.promise;
    },
    addRecord: function(param,res){
        var d = defer(res);
        pool.getConnection(function(err, connection) {    
            onErr(err,d)
            console.log(db.recording.insert);
            connection.query(db.recording.insert, [param.cardNo,param.num,param.time,param.total],function(err, rows) {
                onErr(err,d)
                d.resolve(reRows(rows))
                // 释放连接 
                connection.release()
            });    
        });
        return d.promise;
    },
    queryList: function(params,res){
        var d = defer(res),
            sql = db.select,
            countSql = db.count,
            isType = params.cardType&&params.cardType!=0,
            isName = params.name,
            isPhone = params.phone,
            isAll = isType||isName||isPhone,
            type = parseInt(params.cardType),
            phone = parseInt(params.phone),
            pageNum = parseInt(params.pageNum*10),
            pageSize = parseInt(params.pageSize)

        pool.getConnection(function(err, connection) {    
            if(isAll){
                sql += ' where'
                countSql += ' where'
            }
            if(isType){
                sql += ' type='+connection.escape(type)
                countSql += ' type='+connection.escape(type)
            }
            if(isName){
                sql += isType?' and name='+connection.escape(params.name) : ' name='+connection.escape(params.name)
                countSql += isType?' and name='+connection.escape(params.name) : ' name='+connection.escape(params.name)
            }
            if(isPhone){
                sql += isType||isName?' and phone='+connection.escape(phone):' phone='+connection.escape(phone)
                countSql += isType||isName?' and phone='+connection.escape(phone):' phone='+connection.escape(phone)
            }
            sql += ' order by a.id desc LIMIT '+connection.escape(pageNum)+','+connection.escape(pageSize)
            console.log(sql)
            console.log(countSql)
            onErr(err,d)
            connection.query(sql, function(err, rows){
                onErr(err,d)
                connection.query(countSql, function(err, rows1){
                    d.resolve(reRows(rows,rows1,params.pageNum))
                    connection.release()
                })
            })
        });
        return d.promise
    }
}

module.exports = mysqlTest

