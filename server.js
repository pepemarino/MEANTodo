// server.js
'use strict';

var express = require('express'),
	path = require('path'),
	http = require('http'),
	mongoose = require('mongoose');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get("*", function(req, res){
	res.render('index');	
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));	
});