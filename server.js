// server.js
'use strict';

var express = require('express'),
	path = require('path'),
	http = require('http'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	Todo = require('./models/Todo');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var todoRouter = require('./routes/todoRoutes')(Todo);
app.use('/api/todos/', todoRouter);

app.get("*", function(req, res){
	res.render('index');	
});

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));	
});

var io = require('socket.io')(server);

mongoose.connect('mongodb://localhost:27017/todo');
var con = mongoose.connection;

con.on('error', console.error.bind(console, 'connection error:'));
con.on('disconnected', function(){
	io.emit('dbConnection', { data: { dbConnection : false }} );
	console.log('Connection is disconnected now ' + (new Date()).toLocaleString());
});
con.on('connected', function(){
	io.emit('dbConnection', { data: { dbConnection : true }} );
	console.log('Connected to mongodb successfull');	
});