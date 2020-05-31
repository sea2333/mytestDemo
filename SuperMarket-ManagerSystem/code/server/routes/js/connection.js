// 引入mysql
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root', 
	password: '123456',
	database: 'my_dbms' 
})

connection.connect();
console.log('链接数据库')
module.exports = connection;