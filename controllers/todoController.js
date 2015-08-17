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
	
	var update = function(req, res){
			var id = req.params.todoId;
			Todo.findById(id, function(err, result){
				if(err){
					res.status(500).send('TODO could not be updated ' + err );
				} else {
					if(result !== null){
						result.completed = req.body.completed;
						result.save(function(err, updated){
							if(err){
								res.status(500).send('TODO found but could not be updated ' + err );
							} else {
								res.status(202).send(updated);	
							}
						});
					} else {
						res.status(400).send('TODO could not be updated ' + err );
					}
				}
			});
		};
	
	var purge = function(req, res){
			Todo.find({ completed : true }, function(err, doneTodos){
				if(err){
					res.status(500).send('TODO could clear completed ' + err );
				} else {
					if(doneTodos.length > 0){
						Todo.remove({ _id: { $in: doneTodos }}, function(err){
							if(err){
								res.status(500).send('TODO remove error ' + err );
							} else {
								todoController.get(req, res);
							}
						});
					} else {
						todoController.get(req, res);
					}
				}
			});
		};
		
	return {
		purge: purge,
		update: update,
		post: post,
		get: get
	}
};

module.exports = todoController;
