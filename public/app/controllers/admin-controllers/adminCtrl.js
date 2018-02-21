//******************************************************************************
//******************************************************************************
//	File Name: adminCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the admin pages
//******************************************************************************
//******************************************************************************
angular.module('adminCtrl', ['incidentService', 'ngMaterial', 'ngMessages', 'authService'])
	.controller('adminController', function($scope, $location, incidentFactory, Auth) {
		if ( !Auth.isLoggedIn() ) $location.path('/login');
		else {
			var get_incidents = function(begin, end){
				var promise = incidentFactory.getApptByDateRange(begin, end);
				promise.then(function(response){
					$scope.appts = response.data;
					console.log($scope.appts)

					for(i=0; i<$scope.appts.length; i++){
						$scope.appts[i].date = $scope.appts[i].appt_date.split('T')[0];
						time = $scope.appts[i].appt_time.split(':');
						$scope.appts[i].time = time[0]+':'+time[1];
					}
				});
			}

			var dateToString = function(date) {
				dd = date.getDate()
				if(dd<10) dd='0'+dd; // append 0 if less than 10

				mm = date.getMonth()+1
				if(mm<10) mm='0'+mm; // append 0 if less than 10
				return date.getFullYear()+"-"+mm+"-"+dd;
			};
			today_date = new Date()
			today = dateToString(today_date);

			get_incidents(today, today);

			$scope.begin = today_date;
			$scope.end = today_date;

			$scope.submit_times = function(){
				begin = dateToString($scope.begin);
				end = dateToString($scope.end);
				get_incidents(begin, end);
			}

			$scope.start_appt = function(){
				$location.path('/admin/appt');
			}
		}

	});
