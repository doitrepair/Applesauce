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
			.when('/appt/', {
				templateUrl: 'app/views/forms-pages/form-descrip.html',
				controller: 'apptController'
			})
			.when('/appt/user/', {
				templateUrl: 'app/views/forms-pages/form-user.html',
				controller: 'apptController'
			})
			.when('/appt/comp/', {
				templateUrl: 'app/views/forms-pages/form-comp.html',
				controller: 'apptController'
			})
			.when('/appt/sched', {
				templateUrl: 'app/views/appt-pages/sched.html'
			})
			.when('/appt/success', {
				templateUrl: 'app/views/forms-pages/form-success.html',
				controller: 'apptController'
			})
			.when('/data', {
				templateUrl: 'app/views/data-pages/data-descrip.html',
				controller: 'dataTransController'
			})
			.when('/data/user', {
				templateUrl: 'app/views/forms-pages/form-user.html',
				controller: 'dataTransController'
			})
			.when('/data/comp', {
				templateUrl: 'app/views/forms-pages/form-comp.html',
				controller: 'dataTransController'
			})
			.when('/data/disc', {
				templateUrl: 'app/views/data-pages/data-disclaimer.html',
				controller: 'dataTransController'
			})
			.when('/data/success', {
				templateUrl: 'app/views/forms-pages/form-success.html',
				controller: 'dataTransController'
			});
		// Get rid of has in the URL
		$locationProvider.html5Mode(true);
	});
