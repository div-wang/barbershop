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
        insert:'INSERT INTO person(name, sex, birth, phone) VALUES(?,?,?,?,?)',
        update:'update person set name=?, sex=?, birth=?, phone=? where id=?',
        delete: 'delete from person where id=?',
        queryById: 'select * from person where id=?',
        queryByName: 'select * from person where name=?',
        queryAll: 'select * from `person`'
    },
    card: {
        insert:'INSERT INTO card( type, num, total) VALUES(?,?,?,?,?)',
        update:'update card set type=?, num=?, total=? where id=?',
        delete: 'delete from card where cardNo=?',
        queryById: 'select * from card where cardNo=?',
        queryByType: 'select * from card where type=?',
        queryByDate: 'select * from card where date=?',
        queryAll: 'select * from `card`'
    },
    user: {
        insert:'INSERT INTO user(id, name, password, purview) VALUES(?,?,?,?)',
        upPassword:'update user set name=?, password=? where name=?',
        upPurview:'update user set name=?, purview=? where name=?',
        delete: 'delete from user where name=?',
        queryByName: 'select * from user where name=?',
        queryAll: 'select * from `user`'
    },
    recording: {
        insert: 'INSERT INTO user(cardNo, consumption, time) VALUES(?,?,?)',
        selectId: 'select a.cardNo from person as a left join card as b on a.id = b.id where a.id=',
        selectNo: 'select * from recording where cardNo='
    },
    select: 'select * from person as a left join card as b on a.id = b.id',
    count: 'select COUNT(*) as count from person as a left join card as b on a.id = b.id',

};