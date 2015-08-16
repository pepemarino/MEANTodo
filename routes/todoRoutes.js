// routes/todoRouters.js
'use strinct';
var express = require('express');

var routes = function(Todo){
	
	var todoRouter = express.Router();
	var todoController = require('../controllers/todoController')(Todo);
	
	todoRouter.route('/todos')
		.post(todoController.post)
		.get(todoController.get)
		.delete(todoController.remove);
	
	return todoRouter;
};

module.exports = routes;