'use strict';

var app = angular.module('app', []);

app.controller('todoController', ['$scope', 'todoFactory', function($scope, todoFactory){
	
	$scope.todos = [];
	$scope.error = '';
	
	todoFactory.getTodos().then(
		function(result){
			$scope.todos = result.data; 
		},
		function(err){
			console.log('Error: ' + err);
		}
	);
	
	$scope.addTodo = function() {		
		todoFactory.addTodo($scope.newTodo).then(
			function(respnse){
				$scope.todos.push(respnse.data);
				$scope.newTodo = '';
				if($scope.error !== ''){
					$scope.error = '';
				}
			},
			function(err){
				console.log('Error Adding New ' + err.data);
				$scope.error = err.data.message;
			}
		);
	}
	
	$scope.toggleCompleted = function(id){
		
		var todos = $scope.todos.filter(function(item){
			return item._id === id;
		});
		
		if(todos.length === 1){
			todoFactory.toggleCompleted({
				title: todos[0].title,
				completed: todos[0].completed,
				_id: id
				}).then(
					function(response){
						console.log('successful toggle update');	
					},
					function(response){
						console.log('toggle update failed');
					}
			);	
		}
	}
	
	$scope.clearCompleted = function () {
		todoFactory.deleteDoneTodos().then(
			function(response){
				$scope.todos = response.data;
			},
			function(err){
				console.log('Error Adding New ' + err.data);
				$scope.error = err.data.message;
			}
		);
	};
}]);