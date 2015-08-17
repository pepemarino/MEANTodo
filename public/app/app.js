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
	
	$scope.clearCompleted = function () {
		$scope.todos = $scope.todos.filter(function(item){
			return !item.completed;
		});
	};
}]);