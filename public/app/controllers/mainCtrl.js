angular.module('mainCtrl', [])
	.controller('mainController', function($scope, $location) {
		var vm = this;
		$scope.startRepair = function() {
			console.log('the')
			$location.path('/diagnose');
		}
		/*
		// Get info for user logged in
		vm.loggedIn = Auth.isLoggedIn();
		// For each request, check if user is logged in
		$rootScope.$on('$routeChangeStart', function() {
			vm.loggedIn = Auth.isLoggedIn();
			// Get user information
			Auth.getUser()
				.then(function(data) {
					vm.user = data;
				});
		});
		// Handle login form
		vm.doLogin = function() {
			vm.processing = true;
			//Clear any previous errors
			vm.error = '';
			// Call Auth.login()
			Auth.login(vm.loginData.username, vm.loginData.password)
				.then(function(data) {
					console.log(data);
					vm.processing = false;
					console.log(data.success);
					// If logged in successfully, redirect to users page
					if(data.success) $location.path('/users');
					else vm.error = data.message;
				});
		};
		// Handle logging out
		vm.doLogout = function() {
			Auth.logout();
			// Reset user info
			vm.user = {};
			$location.path('/login');
		};
		*/
	});
