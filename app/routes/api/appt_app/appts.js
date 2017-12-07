// REQUIRED PACKAGES ===========================================================
var mysql 		= require('mysql');
var db 			= require('../../../../config/acme_db.js')

// APIROUTER FUNCTION ==========================================================
module.exports = function(app, express, connection) {
	var apptRouter = express.Router();

    // ROUTES FOR /api/appointments --------------------------------------------
    apptRouter.route('/')
    //Create an Answer
		// create appointment and send back to all appointments in database
		.post(function(req, res) {

			var __device_type = req.body.device_type
			var __consult_type = req.body.consult_type
			var __device_brand = req.body.device_brand
			var __name = req.body.name
			var __email = req.body.email
			var __description = String(req.body.description)
			var __date = req.body.date.toString();
			var __time = req.body.time

			console.log("date: " + __date)

			var __query = "INSERT INTO SS_Appointments\nVALUES ('"+ id_inc + "', '" + __device_type + "', '" + __consult_type +
						  "', '" + __device_brand + "', '" + __name + "', '" + __email + "', '" + __description + "', '" + __date + "', '" +
						  __time + "')"


						  console.log("query: "+ __query)

			connection.query(__query, function(err, data){
				if(err)
					res.send(err)
				console.log(data)
				sendMail(req, 0)
				res.json(data)
			})
		});

	//REGISTERING ROUTES -------------------------------------------------------
	return apptRouter;
};
