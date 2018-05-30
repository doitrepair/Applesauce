// Require the sql_txt file that holds the sql queries
var sql_txt = require('./sql_txt')

// APIROUTER FUNCTION ==========================================================
module.exports = function(app, express, connection) {
	var schedRouter = express.Router();
  var shiftTimes = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30'];

	schedRouter.route('/')
    	// Get schedule from acme database from 'begin' to 'end'
		.post(function(req, res){
			// create and send query
			query = sql_txt.get_sched(req.body.begin,req.body.end, req.body.shift_id)
			connection.query(query, function(err, data){
				if(err)
					console.log(err)
				res.send(changeShiftsArrayToScheduleFormat(data, req.body.shift_id))
			})
		})
		// Update an agents shift to being in a appointment shift
		.put(function(req, res){

			query = sql_txt.update_sched(req.body.timeslot,req.body.date,req.body.netid);
			connection.query(query, function(err, data){
				if(err)
					console.log(err)
				res.send(data)
			})
		});

    var changeShiftsArrayToScheduleFormat = function(data, shift_id) {
      var schedule = [];
      dates = getUniqueDates(data);
      for(h=0; h<dates.length; h++) {
        var timeslots = getTimesAndAgentsGivenDate(data, dates[h], shift_id);
        schedule[h] = {
          'date': dates[h],
          'timeslots': timeslots
        }
      }
      return schedule;
    }

    var getUniqueDates = function(data){
      if(!data) {
        return null;
      }
      var dates = [];
      // Iterate through every date in the data array
      for(i=0; i<data.length; i++) {
        // the Date's toISOString method returns a string of the date in the ISO format
        //  - ex: '2018-01-01T00:00.000Z'
        // we then call the string split function with the separator of 'T'
        //  - ex: ['2018-01-01', '00:00.000Z']
        // Lastly, we take the 0 element of the array to get the date
        //  - ex: '2018-01-01'
        date = data[i].date.toISOString().split('T')[0];
        if(dates.find(function(element){ return element==date }) == undefined){
          dates.push(date);
        }
      }
      return dates;
    }

    var getTimesAndAgentsGivenDate = function(data, date, shift_id) {
      if(!data) {
        return null
      }
      var times = [];
      // Iterate through every date in the data array
      for(i=0; i<data.length; i++) {
        // the Date's toISOString method returns a string of the date in the ISO format
        //  - ex: '2018-01-01T00:00.000Z'
        // we then call the string split function with the separator of 'T'
        //  - ex: ['2018-01-01', '00:00.000Z']
        // Lastly, we take the 0 element of the array to get the date
        //  - ex: '2018-01-01'
        if(data[i].date.toISOString().split('T')[0] == date){
          // Loop through all of the possible shift times
          for(j=0; j<shiftTimes.length; j++){
            // Create the JSON object for the current time and day
            if(times[j]==undefined) {
              times[j] = {
                'time': shiftTimes[j],
                'agents': []
              }
            }
            // console.log("Time: " + j)
            // console.log(times[j])
            // Push the netid of every agent that works (in the specified shift) during the current time and day
            if(data[i][shiftTimes[j]]==shift_id){
              times[j].agents.push(data[i].NetID)
            }
          }
        }
      }
      return times;
    }
	//REGISTERING ROUTES -------------------------------------------------------
	return schedRouter;
};
