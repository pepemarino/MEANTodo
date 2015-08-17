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
		.put(function(req, res){
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
		})
		.delete(function(req, res){
			
		});
		
	todoRouter.route('/purge')
		.get(function(req, res){
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
		});
	
	return todoRouter;
};

module.exports = routes;