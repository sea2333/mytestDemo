const express = require('express');
const router = express.Router();
const connection = require('./js/connection');

router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "authorization,content-type");
    next();
})
router.get('/addSale', (req, res) => {
	let {code, counts} = req.query;
	let sql = `INSERT INTO salelists(code, counts)
	 VALUES('${ code }','${ counts }')`
	connection.query(sql, (err, data) => {
	    if(err) throw err;
	    if(data.affectedRows > 0){
	        res.send({code: 0, msg: '添加成功!'})
	    }else{
	        res.send({code: 1, msg: '添加失败!'})
	    }
	})
})
// 查询
router.get('/quertlists', (req, res) => {
	let {currentpage, pagesize} = req.query;
	let page = (currentpage - 1) * pagesize;
	let sql = `select * from salelists order by saleoftime desc limit ${page} , ${pagesize}`;
	connection.query(sql, (err, data) => {
	    if(err) throw err;
	    if(data.length != 0){
	        res.send(data)
	    }else{
	        res.send(data)
	    }
	})
})
// 总条数
router.get('/totallists', (req, res) => {
	let sql = `select * from stock`;
	connection.query(sql, (err, data) => {
		if(err) throw err;
		res.send(data);
	})
})

module.exports = router;