var sql_txt = require('./sql_txt')
// APIROUTER FUNCTION ==========================================================
module.exports = function(app, express, connection) {
	var schedRouter = express.Router();

	schedRouter.route('/')
    	//Create an Answer
		.post(function(req, res){
			console.log(req.body)
			query = sql_txt.get_sched(req.body.begin,req.body.end)
			connection.query(query, function(err, data){
				if(err)
					console.log(err)
				res.send(data)
			})
		})
		.put(function(req, res){

			query = sql_txt.update_sched(req.body.begin,req.body.end,req.body.date,req.body.first,req.body.last)
			connection.query(query, function(err, data){
				if(err)
					console.log(err)
				res.send(data)
			})
		});
	//REGISTERING ROUTES -------------------------------------------------------
	return schedRouter;
};
