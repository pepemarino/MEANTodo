'use strict';

var app = angular.module('app', []);

app.controller('todoController', ['$scope', 'todoFactory', function($scope, todoFactory){
	
	$scope.todos = [];
	todoFactory.getTodos().then(
		function(result){
			$scope.todos = result.data; 
		},
		function(err){
			console.log('Error: ' + err);
		}
	);
	
	$scope.addTodo = function() {
		$scope.todos.push({'title' : $scope.newTodo, 'completed': false});
		$scope.newTodo = '';
	}
	
	$scope.clearCompleted = function () {
		$scope.todos = $scope.todos.filter(function(item){
			return !item.completed;
		});
	};
}]);