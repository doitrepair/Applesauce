angular.module('app.routes', ['ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		// Route to the homepage
			.when('/', {
				templateUrl : 'app/views/pages/home.html'
			})
			.when('/troubleshoot', {
				templateUrl : 'app/views/pages/question.html',
				controller : 'mainController',
				controllerAs: 'question'
			})
			.when('/refer', {
				templateUrl : 'app/views/pages/question.html',
				controller : 'mainController',
				controllerAs: 'refer'
			})
			.when('/checkin', {
				templateUrl: 'app/views/pages/form.html',
				controller: 'mainController',
				controllerAs: 'form'
			});

		// Get rid of has in the URL
		$locationProvider.html5Mode(true);
	});
