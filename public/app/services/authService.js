angular.module('authService', [])
	.factory('Auth', function($http, $q, AuthToken) {
		var authFactory = {};

		// Handle login ========================================================
		authFactory.login = function(name, password) {
			// Return promise
			return $http.post('/auth/', {
				name: name,
				password: password
			})
				.then(function(data) {
					AuthToken.setToken(data.data.token);
					return data.data;
				});
		};

		// Handle logout =======================================================
		authFactory.logout = function() {
			// Clear token
			AuthToken.setToken();
		};

		// Verify login =======================================================
		authFactory.isLoggedIn = function(){
			if(AuthToken.getToken()) return true;
			else return false;
		};

		// Get Login Info ======================================================
		authFactory.getUser = function() {
			if(!AuthToken.getToken()) return $q.reject({ message: 'No Token.' });
		};
		return authFactory;
	})

	.factory('AuthToken', function($window) {
		var authTokenFactory = {};
		// Get token ===========================================================
		authTokenFactory.getToken = function() {
			return $window.localStorage.getItem('token');
		};
		// Set token ===========================================================
		authTokenFactory.setToken = function(token) {
			if (token) $window.localStorage.setItem('token', token);
			else $window.localStorage.removeItem('token');
		};
		return authTokenFactory;
	})

	.factory('AuthInterceptor', function($q, AuthToken) {
		var interceptorFactory = {};
		// Verify authentication ===============================================
		interceptorFactory.request = function(config) {
			// Get the token
			var token = AuthToken.getToken();
			//If the token exists, add it to the header
			if (token) config.headers['x-access-token'] = token;
			return config;
		};
		// Route to login if failed ============================================
		interceptorFactory.responseError = function(response) {
			if(response.status == 403) {
				AuthToken.setToken();
				$location.path('/login');
			}
			return $q.reject(response);
		};
		return interceptorFactory;
	});
