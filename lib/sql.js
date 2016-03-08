var mysql = require('mysql')
var db = require('./db.js')
var defer = require('./defer.js')

// 使用连接池，提升性能
var pool  = mysql.createPool(db.mysql);

var reRows = function(rows,count,page){
    if(rows) {
        return {
            rCode: 2000,
            rMsg: 'success',
            data: rows,
            total: count[0].count,
            pageNum: parseInt(page)
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
    addPerson: function(param){
        pool.getConnection(function(err, connection) {    
            if (err) throw err
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
            if (err) throw err
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
    queryAll: function(table,res,params){
        var d = defer(res);
        pool.getConnection(function(err, connection) {
            onErr(err,d)
            var sql = db[table].queryAll+' LIMIT '+connection.escape(parseInt(params.pageNum*10))+','+connection.escape(parseInt(params.pageSize))
            connection.query(sql,function(err, rows){
                onErr(err,d)
                connection.query('SELECT COUNT(*) as count FROM '+table, function(err, rows1){
                    d.resolve(reRows(rows,rows1,params.pageNum))
                    connection.release()
                })
            })
        });
        return d.promise;
    },
    queryList: function(params,res){
        var d = defer(res),
            sql = 'select * from person as a left join card as b on a.cardNo = b.cardNo',
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
            }
            if(isType){
                sql += ' type='+connection.escape(type)
            }
            if(isName){
                sql += isType?' and name="'+connection.escape(params.name)+'"':' name="'+connection.escape(params.name)+'"'
            }
            if(isPhone){
                sql += isType||isName?' and phone='+connection.escape(phone):' phone='+connection.escape(phone)
            }
            sql += ' LIMIT '+connection.escape(pageNum)+','+connection.escape(pageSize)
            console.log(sql)
            onErr(err,d)
            connection.query(sql, function(err, rows){
                onErr(err,d)
                connection.query('SELECT COUNT(*) as count FROM `card`', function(err, rows1){
                    d.resolve(reRows(rows,rows1,params.pageNum))
                    connection.release()
                })
            })
        });
        return d.promise
    }
}

module.exports = mysqlTest

