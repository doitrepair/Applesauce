//******************************************************************************
//******************************************************************************
//	File Name: sched.js
//******************************************************************************
//	Module Description: This module controls the dispay of the scheduling page
//						(sched.html)
//******************************************************************************
//******************************************************************************
angular.module('schedCtrl', ['acmeService', 'filters'])
	.controller('schedController', function($scope, $location, acmeFactory, timeFilter) {

		vm = this;

		// Threshold specifies the number of staff required at a specified time
		// in order to let a customer schedule an appointment
		var threshold = 3;
		// Acme DB's id for a 'Dayton' shift
		var dayton = 70

		// String values for time and day to display to customers
		var times = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
	 	var days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

		// Initially show this weeks calendar
		$scope.this_week = true;

		// Format the date to show to customers (yyyy-mm-dd)
		function formatDate(d){
			dd = d.getDate()
			if(dd<10){
				// append 0 if less than 10
				dd='0'+dd;
			}
			mm = d.getMonth()+1
			if(mm<10){
				// append 0 if less than 10
				mm='0'+mm;
			}
			return d.getFullYear()+"-"+mm+"-"+dd
		}

		// Creates an array of length 10 that contains the weekday dates for the
		// current week and next week
		function getWeek(d) {
			dates = [];

			// find the current week's monday's date
			mon = new Date();
			mon.setDate(d.getDate()-d.getDay()+1);

			// Use offset so as to not get weekend dates
			offset = 0;
			for(i=0;i<10;i++){
				if(i==5){
					offset = 2;
				}
				s = new Date();
				s.setDate(mon.getDate()+i+offset)
				dates[i] = formatDate(s);
			}
			return dates;
		}

		// Get todays date
		today = new Date()
		// Store array of dates in scope
		$scope.dates = getWeek(today);

		// Don't let customer's schedule appts in the next 24 hours
		// Easily test this code by setting threshold to 1
		earliest_day = -1
		earliest_hour = -1;
		if(today.getDay()==6){
			earliest_day = days.length
		} else if(today.getDay()!=0){
			earliest_day = today.getDay()-1
			if(today.getHours()>=18){
				earliest_hour = times.length;
			}else if(today.getHours()>8){
				// Convert hour to index in times
				// 8:00 is the earliet appt time
				// multiply by two because appt times are ever 30 mins not hour
				// add one to account for the half-hour increment too
				earliest_hour = (today.getHours()-8)*2 + 1;
			}
		}

		// Create array of columns to display
		$scope.cols = [];
		// Make the first column title blank (because the first col is the times)
		$scope.cols[0] = ['',''];
		for(i=0;i<days.length;i++){
			// Each column after that, give a title of the day of the week
			$scope.cols[i+1] = [days[i],$scope.dates[i]];
		}

		// Now start to fill out each cell
		$scope.cells = [];
		// Get the schedule from the acme database
		var promise = acmeFactory.getSched($scope.dates[0],$scope.dates[9]);
		// Wait for the response before continuing
		promise.then(function(response){
			// Store the response
			vm.schedule = response.data;
			// Create cell matrix to display as a schedule
			for(i=0;i<times.length;i++){
				$scope.cells[i] = {}
				for(j=0;j<days.length;j++){
					$scope.cells[i][j] = {};

					// Each cell has two possible dates (ex: this monday at 9:30
					// and next monday at 9:30)
					$scope.cells[i][j].agents = [[],[]];
					$scope.cells[i][j].dates = [$scope.dates[j],$scope.dates[j+5]];
					for(k=0;k<vm.schedule.length;k++){
						agent = vm.schedule[k];
						ag = {'first':agent.Nick_Name,'last':agent.Last_Name};

						// Check if the agent is working in the Dayton column
						if((agent.date == $scope.dates[j]+"T06:00:00.000Z")&(agent[times[i]]==dayton)){
							var already_exists = false;
							// Check if the agent is listed already (sometimes acme returns duplicates)
							for(l=0;l<$scope.cells[i][j].agents[0].length;l++){
								if(($scope.cells[i][j].agents[0][l].first==ag.first)&($scope.cells[i][j].agents[0][l].last==ag.last)) already_exists=true;
							}
							// If not, add the agent to the list
							if(!already_exists){
								$scope.cells[i][j].agents[0] = $scope.cells[i][j].agents[0].concat([ag])
							}
						}
						if((agent.date == $scope.dates[j+5]+"T06:00:00.000Z")&(agent[times[i]]==dayton)){
							var already_exists = false;
							// Check if the agent is listed already (sometimes acme returns duplicates)
							for(l=0;l<$scope.cells[i][j].agents[1].length;l++){
								if(($scope.cells[i][j].agents[1][l].first==ag.first)&($scope.cells[i][j].agents[1][l].last==ag.last)) already_exists=true;
							}
							// If not, add the agent to the list
							if(!already_exists){
								$scope.cells[i][j].agents[1] = $scope.cells[i][j].agents[1].concat([ag])
							}
						}
					}
					// Give the cell its day of the week, time, and a name to print in the cell
					$scope.cells[i][j].day = days[j];
					$scope.cells[i][j].time = times[i];
					$scope.cells[i][j].name = days[j]+" "+times[i];
					// Mark the cell as active if there are enough agents working
					$scope.cells[i][j].active = ($scope.cells[i][j].agents[0].length >= threshold)
					// Mark the cell as inactive if the time is within the next
					// 24 hours or is earlier
					if((j<=earliest_day)||((j==earliest_day+1)&&(i<=earliest_hour))) $scope.cells[i][j].active = false;
					// Create function to book the appt
					$scope.cells[i][j].book_appt=function(item){
						if(item.active){
							// Check which week is displayed to user
							var k = $scope.this_week ? 0 : 1;
							// Update the agents and date
							item.agents = item.agents[k];
							item.dates = item.dates[k]
							// Save the appt data for the next page
							acmeFactory.book_appt(item);
							// Go to the confirmation page
							$location.path('/appt/confirm');
						}
					}
				}
			}
			console.log($scope.cells)
		});

		// function for changing between weeks on the schedule
		$scope.toggle_week = function(){
			// toggle boolean value
			$scope.this_week = !$scope.this_week;

			// Update the offset to reflect which week is being changed to
			var offset = 0;
			if(!$scope.this_week) offset = 5;

			// Update the column headers
			for(i=0;i<days.length;i++){
				$scope.cols[i+1][1] = $scope.dates[i+offset];
			}
			// update the cell data
			var k = $scope.this_week ? 0 : 1;
			for(i=0;i<times.length;i++){
				for(j=0;j<days.length;j++){
					$scope.cells[i][j].active = ($scope.cells[i][j].agents[k].length >= threshold)
					if(($scope.this_week)&(j<=earliest_day)) $scope.cells[i][j].active = false;
				}
			}


		};
	});
