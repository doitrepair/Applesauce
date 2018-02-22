angular.module('app-net.routes', ['ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		// Route to the homepage
			.when('/net', {
				templateUrl : 'app/views/home.html'
			})
			.when('/net/appt', {
				templateUrl: 'app/views/forms-pages/form-base.html',
				controller: 'apptController'
			})
			.when('/net/appt/success', {
				templateUrl: 'app/views/forms-pages/form-success.html',
				controller: 'apptController'
			})
			.when('/net/data', {
				templateUrl: 'app/views/forms-pages/form-base.html',
				controller: 'dataTransController'
			})
		// Get rid of has in the URL
		$locationProvider.html5Mode(true);
	});
