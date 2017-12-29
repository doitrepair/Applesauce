//******************************************************************************
//******************************************************************************
//	File Name: mainCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the main page
//						(home.html)
//******************************************************************************
//******************************************************************************
angular.module('mainCtrl', [])
	.controller('mainController', function($scope, $location) {
		var vm = this;
		$scope.startRepair = function() {
			$location.path('/repair');
		}
	});
