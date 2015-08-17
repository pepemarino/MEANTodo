// controllers/tocoController.js
'use strict';

var todoController = function(Todo){
	
	var post = function(req, res){
		var todo = new Todo(req.body);
		var query = { title: todo.title };
		Todo.find(query, function (err, todos){
			if(err){
				res.status(500).send('TODO could not be saved ' + err );
			} else {
				if(todos.length === 0){
					todo.save(function(err){
						if(err){
							res.status(500).send(err);
						} else {
							res.status(201).send(todo);
						}
					});		
				} else {
					res.status(409).send({ title: todo.title, message : 'TODO already exists'});
				}
			}
		});
	};
	
	var get = function(req, res){
		Todo.find({}, function(err, todos){
			if(err){
				res.status(500).send('TODO Error getting TODOs ' + err );
			} else {
				res.send(todos);
			}
		});
	};
		
	return {
		post: post,
		get: get
	}
};

module.exports = todoController;
