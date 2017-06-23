//=================
//get all the packages
//=================
var express=require('express');
var app=express();
var bodyparser=require('body-parser');
var morgan=require('morgan');
var mongoose=require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
//var jwt=require('jsonwebtoken');
var config=require('./config');
var User=require('./models/user');
var Product=require('./models/product');
require('./config/passport')(passport);

var mongojs=require('mongojs');//install monogojs using "npm install mongojs" 
var db=mongojs('productlist',['productlist']);
app.use(express.static(__dirname + "/public"));
//=================
//configuration
//=================
var port=process.env.PORT||8080;
mongoose.connect(config.database);
//app.set('secret',config.secret);
app.use(cookieParser());
app.use(bodyparser());
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: config.secret })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//log request
app.use(morgan('dev'));
//=================
//routes
//=================
require('./route.js')(app, passport);
var router=express.Router();

//===============================
// Products routes defined here
//===============================
app.get('/productlist',function(req,res){
db.productlist.find({},function(err,productList){
	res.json(productList);
});
});

app.post('/productlist',function(req,res){
console.log(req.body,'postRequest');
db.productlist.insert(req.body,function(err,docs){
	res.json(docs);
})
});

app.delete('/productlist/:id',function(req,res){
var id=req.params.id;
console.log(id);
db.productlist.remove({_id:mongojs.ObjectId(id)},function(err,docs){
	res.json(docs);
})
});

app.get('/productlist/:id',function(req,res){
var id=req.params.id;
db.productlist.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
	res.json(docs);
})
});

app.put('/productlist/:id',function(req,res){
var id=req.params.id;
db.productlist.findAndModify({
	query:{_id:mongojs.ObjectId(id)},
	update:{$set:{name:req.body.name}},
	new:true},
	function(err,docs){
	res.json(docs);
})
});

//===============================
// Products routes End
//===============================

// apply the routes to our application with the prefix /api
//app.use('/api',router);
//launch
app.listen(port,function(){
	console.log('app is working');
});