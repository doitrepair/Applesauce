//******************************************************************************
//******************************************************************************
//	File Name: sched.js
//******************************************************************************
//	Module Description: This module controls the dispay of the scheduling page
//						(sched.html)
//******************************************************************************
//******************************************************************************
angular.module('schedCtrl', [])
	.controller('schedController', function($scope, $location) {
		var times = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
	 	var days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

		$scope.cols = [''].concat(days);

		$scope.cells = [];
		for(i=0;i<times.length;i++){
			$scope.cells[i] = {}
			$scope.cells[i].time = times[i]
			for(j=0;j<days.length;j++){
				$scope.cells[i][j] = {}
				$scope.cells[i][j].day = days[j];
				$scope.cells[i][j].name = days[j]+" "+times[i];
				$scope.cells[i][j].active = false;
			}
		}
		$scope.orderByFunction = function(cell){
    		return parseInt(cell.index);
		};
		console.log($scope.cells)
	});
