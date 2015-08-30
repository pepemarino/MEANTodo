// app/todoFactory.js
'use strict';

(function (){
	var app = angular.module('app');

	app.factory('todoFactory', ['$http', todoFactory])
	   .factory('socketFactory', ['$rootScope', socketFactory]); 
	
	function todoFactory($http){
		
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
		
		service.deleteDoneTodos = function(){
			return $http.get(baseUrl + '/purge/');
		};
		
		service.toggleCompleted = function(todo){
			return $http.put(baseUrl + '/' + todo._id, todo);
		};
		
		return service;
	}
	
	function socketFactory($rootScope) {
		var socket = io.connect();
		return {
			on: function (eventName, callback) {
				socket.on(eventName, function () {  
					var args = arguments;
					$rootScope.$apply(function () {
						callback.apply(socket, args);
					});
				});
			},
			emit: function (eventName, data, callback) {
				socket.emit(eventName, data, function () {
					var args = arguments;
					$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
					});
				});
			}
		};
	}
	
})();