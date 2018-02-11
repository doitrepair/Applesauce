//******************************************************************************
//******************************************************************************
//	File Name: adminCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the admin pages
//******************************************************************************
//******************************************************************************
angular.module('adminCtrl', ['incidentService'])
	.controller('adminController', function($scope, incidentFactory) {
		var dateToString = function(date) {
			dd = date.getDate()
			if(dd<10) dd='0'+dd; // append 0 if less than 10

			mm = date.getMonth()+1
			if(mm<10) mm='0'+mm; // append 0 if less than 10
			return date.getFullYear()+"-"+mm+"-"+dd;
		};

		today = dateToString(new Date());
		console.log(today)

		var promise = incidentFactory.getApptByDateRange('2018-01-01', '2018-03-01');
		promise.then(function(response){
			$scope.appts = response.data;
			console.log($scope.appts)

			for(i=0; i<$scope.appts.length; i++){
				$scope.appts[i].date = $scope.appts[i].appt_date.split('T')[0];
				time = $scope.appts[i].appt_time.split(':');
				$scope.appts[i].time = time[0]+':'+time[1];
			}
		});

	});
