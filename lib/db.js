// MySQL数据库联接配置
module.exports = {
    mysql: {
        host: '52.69.101.175', 
        user: 'root',
        password: '123456',
        database:'test', // 前面建的user表位于这个数据库中
        port: 3306
    },
    person: {
        insert:'INSERT INTO person(id, name, sex, birth, phone, cardNo) VALUES(?,?,?,?,?,?)',
        update:'update user set name=?, sex=?, birth=?, phone=?, cardNo=? where id=?',
        delete: 'delete from user where id=?',
        queryById: 'select * from user where id=?',
        queryByName: 'select * from user where name=?',
        queryAll: 'select * from user'
    },
    card: {
        insert:'INSERT INTO card(Id, cardNo, type, num, total, date) VALUES(?,?,?,?,?,?)',
        update:'update user set type=?, num=?, total=?, date=? where cardNo=?',
        delete: 'delete from user where cardNo=?',
        queryById: 'select * from user where cardNo=?',
        queryByType: 'select * from user where type=?',
        queryByDate: 'select * from user where date=?',
        queryAll: 'select * from user'
    },
    user: {
        insert:'INSERT INTO user(id, name, password, purview) VALUES(?,?,?,?)',
        upPassword:'update user set name=?, password=? where name=?',
        upPurview:'update user set name=?, purview=? where name=?',
        delete: 'delete from user where name=?',
        queryByName: 'select * from user where name=?',
        queryAll: 'select * from user'
    }
};