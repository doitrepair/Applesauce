//******************************************************************************
//******************************************************************************
//	File Name: mainCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the main page
//						(home.html)
//******************************************************************************
//******************************************************************************
angular.module('mainCtrl', ['ngCookies'])
	.controller('mainController', function($scope, $location, $window, $cookies) {
		var vm = this;
		console.log($cookies);
		$scope.startRepair = function() {
			$location.path('/repair');
		}
		$scope.startAppt = function() {
			// Not using location.path so as to force a page reload that checks authentication
			$window.location.href = "https://applesauce.doit.wisc.edu/appt"
		}
	});
