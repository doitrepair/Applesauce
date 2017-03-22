angular.module('userService', [])
	.factory('question', function($http) {
		// Create a new factory object
		var qFactory = {};
		// Get a single question
		qFactory.get = function(id) {
			return $http.get('/api/questions/' + id);
		};
		// Getting all question
		qFactory.all = function() {
			return $http.get('/api/questions/');
		};
		// Creating a question
		qFactory.create = function(userData) {
			return $http.post('/api/questions/', userData);
		};
		// Updating a question
		qFactory.update = function(id, userData) {
			return $http.put('/api/questions/' + id, userData);
		};
		// Deleting a question
		qFactory.delete = function(id) {
			return $http.delete('/api/questions/' + id);
		};
		// Return the factory object
		return qFactory;
	});
