// controllers/tocoController.js
'use strict';

var todoController = function(Todo){
	
	var post = function(req, res){
		var todo = new Todo(req.body);
	    todo.save(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.status(201).send(todo);
			}
		});
	};
	
	var get = function(req, res){
		
		var todos = [
			{
				title: 'First todo',
				completed: false
			},
			{
				title: 'Second todo',
				completed: false
			}
		];
		res.json(todos);
		
	};
	
	var remove = function(req, res){
		
	};
	
	return {
		post: post,
		get: get,
		remove: remove
	}
};

module.exports = todoController;
