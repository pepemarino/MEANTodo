// app/todoFactory.js
'use strict';
var app = angular.module('app');

app.factory('todoFactory', ['$http', function($http){
	
	var baseUrl = '/api/todos/';
	var service = {};
	
	service.getTodos = function(){
		return $http.get(baseUrl);
	};
	
	service.addTodo = function(todoStr){
		var newTodo = {
			title: todoStr,
			completed : false
		};
		return $http.post(baseUrl, newTodo);
	};
	
	service.deleteTodos = function(){
		
	};
	
	return service;
}]);