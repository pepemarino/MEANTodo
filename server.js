// server.js
'use strict';

var express = require('express'),
	path = require('path'),
	http = require('http'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	Todo = require('./models/Todo'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	flash = require('connect-flash');

mongoose.connect('mongodb://localhost/todo');
var con = mongoose.connection;
con.once('open', function(){
	console.log('Connected to mongodb successfull');	
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/* 
app.use(cookieParser);
app.use(session({
	secret: 'MUGToDo',
	resave: true,
    saveUninitialized: true
}));
app.use(flash());
*/
var todoRouter = require('./routes/todoRoutes')(Todo);
app.use('/api/todos/', todoRouter);

app.get("*", function(req, res){
	res.render('index');	
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));	
});