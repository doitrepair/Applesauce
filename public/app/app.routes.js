angular.module('app.routes', ['ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		// Route to the homepage
			.when('/', {
				templateUrl : 'app/views/home.html'
			})
			.when('/login', {
				templateUrl: 'app/views/forms-pages/form-base.html',
				controller: 'loginController'
			})
			.when('/admin', {
				templateUrl: 'app/views/admin-pages/admin-home.html',
				controller: 'loginController'
			})
			.when('/admin/appt', {
				templateUrl: 'app/views/forms-pages/form-base.html',
				controller: 'adminFormController'
			})
			.when('/net*', {
				templateUrl: 'app/views/home.html',
				controller: 'netReloadController'
			}) ;
		// Get rid of has in the URL
		$locationProvider.html5Mode(true);
	});
