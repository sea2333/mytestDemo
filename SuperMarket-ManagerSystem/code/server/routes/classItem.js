const express = require('express');
const router = express.Router();
const connection = require('./js/connection');

router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "authorization,content-type");
    next();
})

//////////////////////////////////////////////////////// 合法性验证
// // 密钥
// const secretKey = 'junnima';
// // 引入express-jwt
// const expressJwt = require('express-jwt');
// // 验证token合法性
// router.use(expressJwt({
// 	secret: secretKey
// }).unless({
// 	path: ['/login/check']	//拦截除此之外的地址
// }));
// // 路由拦截器
// router.use(function(err, req, res, next) {
// 	if(err.name === 'UnauthorizedError'){
// 		res.status(401).send('token不合法!');
// 	}
// })
////////////////////////////////////////////////////// 合法性验证结束

router.get('/showClassItem', (req, res) => {
	let sql = `select theclass from goodsclass`;
	connection.query(sql, (err, data) => {
        res.send(data); 
	})
})

router.post('/deleteClassItem', (req, res) => {
    console.log(req.body)
    let theclass = req.body.theclass
	let sql = `delete from goodsclass where theclass='${ theclass }'`
	connection.query(sql, (err, data) => {
        if(err) throw err;
		if(data.affectedRows > 0){
			res.send({code: 0, msg: '删除成功!'})
		}else{
			res.send({code: 1, msg: '删除失败!'})
		}
	})
})

router.post('/addClassItem', (req, res) => {
    console.log(req.body)
    let theclass = req.body.theclass
	let sql = `INSERT INTO goodsclass(theclass,classCanUsed) VALUES('${ theclass }',0)`
	connection.query(sql, (err, data) => {
        if(err) throw err;
		if(data.affectedRows > 0){
            res.send({code: 0, msg: '添加8成功!'})
            
		}else{
			res.send({code: 1, msg: '添加失败!'})
        }
        console.log(data)
	})
})
module.exports = router;