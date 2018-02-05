//******************************************************************************
//******************************************************************************
//	File Name: mainCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the main page
//						(home.html)
//******************************************************************************
//******************************************************************************
angular.module('mainCtrl', [])
	.controller('mainController', function($scope, $location, $window) {
		var vm = this;
		$scope.startRepair = function() {
			$location.path('/repair');
		}
		$scope.startAppt = function() {
			$window.location.href = "https://applesauce.doit.wisc.edu/appt"
		}
	});
