var mysql = require('mysql');
var db = require('./db.js');
// 使用连接池，提升性能
var pool  = mysql.createPool(db.mysql);

var reRows = function(rows){
    if(rows) {
        rows = {
            rCode: 2000,
            rMsg:'增加成功'
        };    
    }
    return
}

var mysqlTest = {
    addPerson: function(param){
        var data = {}
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.person.insert, [param.id, param.name, param.sex, param.bridth], function(err, rows) {
                if (err) throw err;
                data = reRows(rows)
                // 释放连接 
                connection.release();
            });    
        });
        return data
    },
    addCard: function(param){
        var data = {}
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.card.insert, [param.id, param.name, param.sex, param.bridth], function(err, rows) {
                if (err) throw err;
                data = reRows(rows)
                // 释放连接 
                connection.release();
            });    
        });
        return data
    },
    delPerson: function(id){
        var data = {}
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.person.delete, [id], function(err, rows) {
                if (err) throw err;
                data = reRows(rows)
                // 释放连接 
                connection.release();
            });
        });
        return data
    },
    delCard: function(id){
        var data = {}
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.card.delete, [id], function(err, rows) {
                if (err) throw err;
                data = reRows(rows)
                // 释放连接 
                connection.release();
            });
        });
        return data
    },
    upPerson: function(param){
        var data = {}
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.person.delete, [id], function(err, rows) {
                if (err) throw err;
                data = reRows(rows)
                // 释放连接 
                connection.release();
            });
        });
        return data
    },
    upCard: function(param){
        var data = {}
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db.card.delete, [id], function(err, rows) {
                if (err) throw err;
                data = reRows(rows)
                // 释放连接 
                connection.release();
            });
        });
        return data
    },
    queryAll: function(type){
        var data = null; 
        pool.getConnection(function(err, connection) {    
            if (err) throw err;
            connection.query(db[type].queryAll,function(err, rows){
                if (err) throw err;
                console.log(rows);
                data = reRows(rows)
            })
        });
        return data
    }
}

module.exports = mysqlTest;