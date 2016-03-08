// MySQL数据库联接配置
module.exports = {
    mysql: {
        connectionLimit : 10,
        host: '52.69.101.175', 
        user: 'root',
        password: '123456',
        database:'test', // 前面建的user表位于这个数据库中
        port: 3306
    },
    person: {
        insert:'INSERT INTO person(id, name, sex, birth, phone, cardNo) VALUES(?,?,?,?,?,?)',
        update:'update person set name=?, sex=?, birth=?, phone=?, cardNo=? where id=?',
        delete: 'delete from person where id=?',
        queryById: 'select * from person where id=?',
        queryByName: 'select * from person where name=?',
        queryAll: 'select * from `person`'
    },
    card: {
        insert:'INSERT INTO card(Id, cardNo, type, num, total, date) VALUES(?,?,?,?,?,?)',
        update:'update card set type=?, num=?, total=?, date=? where cardNo=?',
        delete: 'delete from card where cardNo=?',
        queryById: 'select * from card where cardNo=?',
        queryByType: 'select * from card where type=?',
        queryByDate: 'select * from card where date=?',
        queryAll: 'select * from `card` LIMIT 0,10 '
    },
    user: {
        insert:'INSERT INTO user(id, name, password, purview) VALUES(?,?,?,?)',
        upPassword:'update user set name=?, password=? where name=?',
        upPurview:'update user set name=?, purview=? where name=?',
        delete: 'delete from user where name=?',
        queryByName: 'select * from user where name=?',
        queryAll: 'select * from `user`'
    }
};