// app/todoFactory.js
'use strict';
var app = angular.module('app');

app.factory('todoFactory', ['$http', function($http){
	
	var baseUrl = '/api/todos/';
	var service = {};
	
	service.getTodos = function(){
		return $http.get(baseUrl);
	};
	
	service.addTodo = function(todo){
		
	};
	
	service.deleteTodos = function(){
		
	};
	
	return service;
}]);