// Require the sql_txt file that holds the sql queries
var sql_txt = require('./sql_txt')

// APIROUTER FUNCTION ==========================================================
module.exports = function(app, express, connection) {
	var schedRouter = express.Router();

	schedRouter.route('/')
    	// Get schedule from acme database from 'begin' to 'end'
		.post(function(req, res){
			// create and send query
			query = sql_txt.get_sched(req.body.begin,req.body.end, req.body.shift_id)
			connection.query(query, function(err, data){
				if(err)
					console.log(err)
				res.send(data)
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
	//REGISTERING ROUTES -------------------------------------------------------
	return schedRouter;
};
