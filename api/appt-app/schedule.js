// Require the sql_txt file that holds the sql queries
var sql_txt = require('./sql_txt')

// APIROUTER FUNCTION ==========================================================
module.exports = function(app, express, connection) {
	var schedRouter = express.Router();
  var shiftTimes = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30'];
  var schedule = [];

	schedRouter.route('/')
    	// Get schedule from acme database from 'begin' to 'end'
		.post(function(req, res){
			// create and send query
			query = sql_txt.get_sched(req.body.begin, req.body.end, req.body.shift_id)
			connection.query(query, function(err, data){
				if(err)
					console.log(err)
        changeShiftsArrayToScheduleFormat(req.body.begin, req.body.end, data, req.body.shift_id)
				res.send(schedule);
        schedule = {};
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

    var changeShiftsArrayToScheduleFormat = function(begin, end, data, shift_id) {
      initializeSchedule(begin, end);
      getAgentsForEachDatetime(data, shift_id);
    };

    var getAgentsForEachDatetime = function(data, shift_id) {
      if(!data) {
        return null
      }
      // Iterate through every date
      for(i=0; i<schedule.length; i++) {
        var date = schedule[i].date;

        // Iterate through all the data
        for (j=0; j<data.length; j++) {

          // If the data item's date is the same as the curr date
          if(convertDate(data[j].date) == date) {
            // Iterate through every timeslot
            for (k=0; k<schedule[i].timeslots.length; k++) {
              var timeslot = schedule[i].timeslots[k].time

              if(data[j][timeslot]==shift_id){
                schedule[i].timeslots[k].agents.push(data[j].NetID)
              }
            }
          }
        }
      }
    }

    // initializes schedule array with empty shifts
    var initializeSchedule = function(begin, end) {
      var currDate = new Date(begin+"T05:00:00");
      var endDate = new Date(end+"T05:00:00");
      var cnt = 0;
      while(currDate <= endDate) {
        schedule[cnt] = {
          'date': convertDate(currDate),
          'timeslots': []
        }
        for (i=0; i<shiftTimes.length; i++) {
          schedule[cnt].timeslots[i] = {
            'time': shiftTimes[i],
            'agents': []
          }
        }
        // Go to the next date
        currDate = new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate()+1, 0, 0, 0);
        cnt = cnt+1
      }
    }

    var convertDate = function(date) {
      // the Date's toISOString method returns a string of the date in the ISO format
      //  - ex: '2018-01-01T00:00.000Z'
      // we then call the string split function with the separator of 'T'
      //  - ex: ['2018-01-01', '00:00.000Z']
      // Lastly, we take the 0 element of the array to get the date
      //  - ex: '2018-01-01'
      return date.toISOString().split('T')[0];
    }
	//REGISTERING ROUTES -------------------------------------------------------
	return schedRouter;
};
