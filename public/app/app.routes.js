angular.module('app.routes', ['ngRoute','questionCtrl'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		// Route to the homepage
			.when('/', {
				templateUrl : 'app/views/home.html'
			})
			/* Temporarily removing this section
			.when('/repair/success', {
				templateUrl : 'app/views/repair-pages/landing-page.html'
			})
			.when('/repair', {
				templateUrl : 'app/views/repair-pages/questions.html'
			})
			.when('/repair/confirm', {
				templateUrl: 'app/views/repair-pages/repair-form.html'
			})
			*/
			.when('/forms/success', {
				templateUrl: 'app/views/forms-pages/forms-landing-page.html'
			})
			.when('/forms/data', {
				templateUrl: 'app/views/forms-pages/data-transfer-form.html'
			})
			.when('/appt', {
				templateUrl: 'app/views/appt-pages/appt-form-descrip.html'
			})
			.when('/appt/user', {
				templateUrl: 'app/views/appt-pages/appt-form-user.html'
			})
			.when('/appt/comp', {
				templateUrl: 'app/views/appt-pages/appt-form-comp.html'
			})
			.when('/appt/sched', {
				templateUrl: 'app/views/appt-pages/sched.html'
			})
			.when('/appt/success', {
				templateUrl: 'app/views/appt-pages/appt-landing-page.html'
			});
		// Get rid of has in the URL
		$locationProvider.html5Mode(true);
	});
