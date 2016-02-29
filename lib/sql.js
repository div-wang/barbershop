var mysql = require('mysql');
var db = require('./db.js');
var defer = require('./defer.js');
// 使用连接池，提升性能
var pool  = mysql.createPool(db.mysql);

var reRows = function(rows){
    if(rows) {
        res = {
            rCode: 2000,
            rMsg: 'success',
            data: rows
        };    
    }
    return res
}
var onErr = function(err,defer){
    if(err){
        console.log(err) 
        defer.reject(err);
    }
}
var data = {}
var mysqlTest = {
    addPerson: function(param){
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.person.insert, [param.id, param.name, param.sex, param.bridth], function(err, rows) {
                if (err) throw err
                data = reRows(rows)
                // 释放连接 
                connection.release()
            });    
        });
        return data
    },
    addCard: function(param){
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.card.insert, [param.id, param.name, param.sex, param.bridth], function(err, rows) {
                if (err) throw err
                data = reRows(rows)
                // 释放连接 
                connection.release()
            });    
        });
        return data
    },
    delPerson: function(id){
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.person.delete, [id], function(err, rows) {
                if (err) throw err
                data = reRows(rows)
                // 释放连接 
                connection.release()
            });
        });
        return data
    },
    delCard: function(id){
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.card.delete, [id], function(err, rows) {
                if (err) throw err
                data = reRows(rows)
                // 释放连接 
                connection.release()
            });
        });
        return data
    },
    upPerson: function(param){
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.person.delete, [id], function(err, rows) {
                if (err) throw err
                data = reRows(rows)
                // 释放连接 
                connection.release()
            });
        });
        return data
    },
    upCard: function(param){
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.card.delete, [id], function(err, rows) {
                if (err) throw err;
                data = reRows(rows)
                // 释放连接 
                connection.release()
            });
        });
        return data
    },
    queryAll: function(type,res){
        var d = defer(res);
        pool.getConnection(function(err, connection) {    
            onErr(err,d)
            connection.query(db[type].queryAll,function(err, rows){
                onErr(err,d)
                d.resolve(reRows(rows));
                connection.release()
            })
        });
        return d.promise;
    },
    queryByType: function(type,res){
        var d = defer(res);
        pool.getConnection(function(err, connection) {    
            onErr(err,d)
            connection.query(db.card.queryByType, [type], function(err, rows){
                onErr(err,d)
                d.resolve(reRows(rows));
                connection.release()
            })
        });
        return d.promise;
    }
}

module.exports = mysqlTest