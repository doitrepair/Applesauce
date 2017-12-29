//******************************************************************************
//******************************************************************************
// Module Description:
//******************************************************************************
//******************************************************************************
angular.module("filters", [])
    .filter("time", function () {
        return function(input) {
			input = input || '';
			var output = "";
			time_vec = input.split(':');
			hour = parseInt(time_vec[0]);
			minute = parseInt(time_vec[1]);
			if(minute<10){
				minute = "0"+minute;
			}
			time = "";

			if(hour==0){
					time = "12:"+minute+" AM";
			} else if(hour<12) {
					time = hour+":"+minute+" AM";
			} else if(hour==12) {
					time = "12:"+minute+" PM";
			} else if(hour<24) {
					time = (hour-12)+":"+minute+" PM";
			}
			return time;
        };
    });
