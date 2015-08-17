// routes/todoRouters.js
'use strinct';
var express = require('express');

var routes = function(Todo){
	
	var todoRouter = express.Router();
	var todoController = require('../controllers/todoController')(Todo);
	
	todoRouter.route('/')
		.post(todoController.post)
		.get(todoController.get);
	
	todoRouter.route('/:todoId')
		.put(todoController.update)
		.delete(function(req, res){
			
		});
		
	todoRouter.route('/purge')
		.get(todoController.purge);
	
	return todoRouter;
};

module.exports = routes;