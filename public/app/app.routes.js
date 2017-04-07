angular.module('app.routes', ['ngRoute','questionCtrl'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		// Route to the homepage
			.when('/', {
				templateUrl : 'app/views/pages/home.html'
			})
			.when('/template', {
				templateUrl : 'app/views/pages/uwMadTemplate.html'
			})
			.when('/diagnose', {
				templateUrl : 'app/views/pages/questions.html'
			})
			.when('/repair', {
				templateUrl: 'app/views/pages/repair-form.html'
			});

		// Get rid of has in the URL
		$locationProvider.html5Mode(true);
	});
