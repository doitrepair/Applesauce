//******************************************************************************
//******************************************************************************
//	File Name: sched.js
//******************************************************************************
//	Module Description: This module controls the dispay of the scheduling page
//						(sched.html)
//******************************************************************************
//******************************************************************************
angular.module('schedCtrl', ['acmeService'])
	.controller('schedController', function($scope, $location, acmeFactory) {

		vm = this;

		var threshold = 3;
		var times = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
	 	var days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

		$scope.this_week = true;
		$scope.open_popup = [];

		function formatDate(d){
			dd = d.getDate()
			if(dd<10){
				dd='0'+dd;
			}
			mm = d.getMonth()+1
			if(mm<10){
				mm='0'+mm;
			}
			return d.getFullYear()+"-"+mm+"-"+dd
		}

		function getWeek(d) {
			mon = new Date();
			mon.setDate(d.getDate()-d.getDay()+1)
			dates = []
			offset = 0
			for(i=0;i<10;i++){
				if(i==5){
					offset = 2
				}
				s = new Date()
				s.setDate(mon.getDate()+i+offset)
				dates[i] = formatDate(s);
			}
			return dates;
		}
		today = new Date()
		$scope.dates = getWeek(today);

		// Don't let customer's schedule appts in the past or for right now
		earliest_day = -1
		if(today.getDay()==6){
			earliest_day = days.length
		} else if(today.getDay()!=0){
			earliest_day = today.getDay()-1
		}

		$scope.cols = [];
		$scope.cols[0] = ['',''];
		for(i=0;i<days.length;i++){
			$scope.cols[i+1] = [days[i],$scope.dates[i]];
		}

		$scope.cells = [];
		var promise = acmeFactory.getSched($scope.dates[0],$scope.dates[9]);
		promise.then(function(response){
			vm.schedule = response.data;

			for(i=0;i<times.length;i++){
				$scope.cells[i] = {}
				for(j=0;j<days.length;j++){
					$scope.cells[i][j] = {};

					$scope.cells[i][j].agents = [];
					$scope.cells[i][j].agents[0] = [];
					$scope.cells[i][j].agents[1] = [];
					for(k=0;k<vm.schedule.length;k++){
						agent = vm.schedule[k]

						date = "2017-12-05";
						if((agent.date == $scope.dates[j]+"T06:00:00.000Z")&(agent[times[i]]==70)){
							ag = {'first':agent.Nick_Name,'last':agent.Last_Name};
							$scope.cells[i][j].agents[0] = $scope.cells[i][j].agents[0].concat([ag])
						}
						if((agent.date == $scope.dates[j+5]+"T06:00:00.000Z")&(agent[times[i]]==70)){
							ag = {'first':agent.Nick_Name,'last':agent.Last_Name};
							$scope.cells[i][j].agents[1] = $scope.cells[i][j].agents[1].concat([ag])
						}
					}
					$scope.cells[i][j].day = days[j];
					$scope.cells[i][j].time = times[i];
					$scope.cells[i][j].name = days[j]+" "+times[i];
					$scope.cells[i][j].active = ($scope.cells[i][j].agents[0].length >= threshold)
					if(j<=earliest_day) $scope.cells[i][j].active = false;
					$scope.cells[i][j].book_appt=function(item){
						if(item.active){
							acmeFactory.book_appt(item);
							$location.path('/appt/confirm');
						}
					}
				}
			}
			console.log($scope.cells)
		});

		$scope.toggle_week = function(){
		$scope.this_week = !$scope.this_week;

		var offset = 0;
		if(!$scope.this_week) offset = 5;

		for(i=0;i<days.length;i++){
			$scope.cols[i+1][1] = $scope.dates[i+offset];
		}
		var k = $scope.this_week ? 0 : 1;
		for(i=0;i<times.length;i++){
			for(j=0;j<days.length;j++){
				$scope.cells[i][j].active = ($scope.cells[i][j].agents[k].length >= threshold)
				if(($scope.this_week)&(j<=earliest_day)) $scope.cells[i][j].active = false;
			}
		}


	};

	});
