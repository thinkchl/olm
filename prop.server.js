var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.dev.port;

var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

var appDate = require('./data.json');//获取数据

var seller = appDate.seller;
var goods = appDate.goods;
var ratings = appDate.ratings;

var apiRouters = express.Router();//定义路由

apiRouters.get('/',(req,res,next)=>{
	req.url = '/index.html';
	next();
})

apiRouters.get('/seller',function(req,res){
    res.json({
        //一个返回数据的状态码  进行判断
        errno:0,
        data:seller
    });
});

apiRouters.get('/goods',function(req,res){
    res.json({
        //一个返回数据的状态码  进行判断
        errno:0,
        data:goods
    });
});

apiRouters.get('/ratings',function(req,res){
    res.json({
        //一个返回数据的状态码  进行判断
        errno:0,
        data:ratings
    });
});

app.use('/api',apiRouters);//暴露接口

app.use(express.static('./dist'));

module.exports = app.listen(port,(err)=>{
	if(err){
		console.log(err)
	}
	console.log('listening at '+port)
})