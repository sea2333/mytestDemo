var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var accountsRouter = require('./routes/accounts');
var goodsRouter = require('./routes/goods.js');
var vipaccountRouter = require('./routes/vipaccount.js');
var stockRouter = require('./routes/stock.js');
var salelistsRouter = require('./routes/salelists.js');
var loginRouter = require('./routes/login.js');
var classItemRouter = require('./routes/classItem.js');

var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/accounts', accountsRouter);
app.use('/goods', goodsRouter);
app.use('/vipaccount', vipaccountRouter);
app.use('/stock', stockRouter);
app.use('/salelists', salelistsRouter);
app.use('/login', loginRouter);
app.use('/classItem', classItemRouter);

// 404页面找不到时
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})


module.exports = app;
