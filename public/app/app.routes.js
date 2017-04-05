angular.module('app.routes', ['ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		// Route to the homepage
			.when('/', {
				templateUrl : 'app/views/pages/home.html'
			})
			.when('/template', {
				templateUrl : 'app/views/pages/uwMadTemplate.html'
			})
			.when('/users', {
				templateUrl: 'app/views/pages/users/all.html',
				controller: 'userController',
				controllerAs: 'user'
			});

		// Get rid of has in the URL
		$locationProvider.html5Mode(true);
	});
