//******************************************************************************
//******************************************************************************
//	File Name: sched.js
//******************************************************************************
//	Module Description: This module controls the dispay of the scheduling page
//						(sched.html)
//******************************************************************************
//******************************************************************************
angular.module('schedCtrl', ['acmeService', 'apptService', 'infoService', 'filters'])
	.controller('schedController', function($scope, $location, acmeFactory, timeFilter, userData, apptData, days, times) {

		vm = this;

		// Threshold specifies the number of staff required at a specified time
		// in order to let a customer schedule an appointment
		var threshold = 3;
		// Acme DB's id for a 'Dayton' shift
		var shift_id = 70 // 64 for appoitment

		// Initially show this weeks calendar
		$scope.week_num = 0;

		////// PART 1: Get Dates Corresponding To This Week And Next Week //////

		// Get's the closest monday prior to a given date (returns the same date
		// if it's already a monday)
		getPreviousMonday = function(d){
			if( d.getDate()-d.getDay() > 0) {
				return new Date(d.getFullYear(), d.getMonth(), d.getDate()-d.getDay()+1);
			} else {
				prevmonth = new Date(d.getFullYear(), d.getMonth(), 0); // 0 causes wrap around to the last day of the previous month (and potentially year)
				return new Date(prevmonth.getFullYear(), prevmonth.getMonth(), prevmonth.getDate()-prevmonth.getDay()+1);
			}
		}

		// Creates an array of length 10 that contains the weekday dates for the
		// week of a given date along with the following week
		function getTwoWeeks(d) {
			$scope.dates = [];
			$scope.friendly_dates = [];

			mon = getPreviousMonday(d);

			// Use offset so as to not get weekend dates
			offset = 0;
			for(i=0;i<10;i++){
				if(i==5) offset = 2;

				s = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate()+i+offset);

				dd = s.getDate()
				// append 0 if less than 10
				if(dd<10) dd='0'+dd;

				mm = s.getMonth()+1
				// append 0 if less than 10
				if(mm<10) mm='0'+mm;

				$scope.friendly_dates[i] = mm+"/"+dd;
				$scope.dates[i] = s.getFullYear()+"-"+mm+"-"+dd;
			}
		}

		// Get todays date
		today = new Date();
		getTwoWeeks(today);

		//////// PART 2: Set Up Rows, Cols, And Cells For The Schedule /////////

		// Don't let customer's schedule appts in the past
		// Easily test this code by setting the var threshold to 1
		earliest_day = -1
		earliest_hour = -1;
		if(today.getDay()==6){
			earliest_day = days.length
		} else if(today.getDay()!=0){
			earliest_day = today.getDay()-2
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
		for(i=0;i<days.length;i++){
			// Each column after that, give a title of the day of the week
			$scope.cols[i] = [days[i],$scope.friendly_dates[i]];
		}

		// Time range displayed on top of schedule
		$scope.time_range = $scope.friendly_dates[0] + ' - ' + $scope.friendly_dates[4]

		// Create function for formatting cells
		format_cell = function(week_idx, time_idx, day_idx){
			cell = {};
			date_idx = day_idx + week_idx*5;

			cell.date = $scope.dates[date_idx];
			cell.friendly_date = $scope.friendly_dates[date_idx];
			cell.day = days[day_idx];
			cell.time = times[time_idx];

			cell.agents = [];
			for(k=0;k<vm.schedule.length;k++){
				agent = vm.schedule[k];
				// Check if the agent is working in the Dayton column
				if((agent.date == $scope.dates[date_idx])&(agent[times[time_idx]]==shift_id)){
					ag = {'first':agent.Nick_Name,'last':agent.Last_Name, 'netid': agent.NetID};
					cell.agents = cell.agents.concat([ag]);
				}
			}

			// Mark the cell as active if we have enough staff
			cell.active = (cell.agents.length >= threshold)
			// Mark the cell as inactive if the time has already passed
			if((date_idx<=earliest_day)||((date_idx==earliest_day+1)&&(time_idx<=earliest_hour))) cell.active = false;
			return cell;
		}

		//// PART 3: Get The Actual Schedule From ACME & Instantiate Cells /////

		all_cells = [];
		// Get the schedule from the acme database
		var promise = acmeFactory.getSched($scope.dates[0],$scope.dates[9], shift_id);
		// Wait for the response before continuing
		promise.then(function(response){
			// Store the response
			vm.schedule = response.data;

			// Reformat date from "0000-00-00T000000" to "0000-00-00" (removes time)
			for(i=0;i<vm.schedule.length;i++){
				vm.schedule[i].date = vm.schedule[i].date.split("T")[0];
			}

			// Create cell matrix to display as a schedule
			for(week_idx=0; week_idx<2; week_idx++){
				all_cells[week_idx] = [];
				for(time_idx=0;time_idx<times.length;time_idx++){
					all_cells[week_idx][time_idx] = [];
					for(day_idx=0;day_idx<days.length;day_idx++){
						all_cells[week_idx][time_idx][day_idx] = format_cell(week_idx, time_idx, day_idx);
					}
				}
			}
			// Set the current schedule to this week
			$scope.sched_cells = all_cells[$scope.week_num];
		});

		////////// PART 4: Create Support For Toggling Between Weeks ///////////

		// function for changing between weeks on the schedule
		$scope.toggle_week = function(forward){
			if((forward && $scope.week_num==0) || (!forward && $scope.week_num==1)){
				// toggle boolean value
				$scope.week_num = ($scope.week_num+1)%2;
				$scope.time_range = $scope.friendly_dates[0+$scope.week_num*5] + ' - ' + $scope.friendly_dates[4+$scope.week_num*5]
				$scope.sched_cells = all_cells[$scope.week_num];
			}
		}
		$scope.back_to_comp_form = function(){
			form = 'app/views/forms-pages/form-comp.html';
		}
	});
