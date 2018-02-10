// incidentRouter FUNCTION ==========================================================
module.exports = function(app, express, db_connection) {
	//Define instance of API Router
	var incidentRouter = express.Router();

	// ROUTES FOR /api/incident -----------------------------------------------
	incidentRouter.route('/')
		//Create a incident
		.post(function(req, res) {
			db_connection.getConnection(function(err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
					console.log('Connection established!');
                	db_connection.query('INSERT INTO incidents (net_id, case_type, first_name, \
						last_name, email, phone, description, short_description, appt_active,  \
						appt_date, appt_time, appt_agent, serial_number, serial_number_2, device_type, \
						os, make, contact_pref, created_by, case_number) \
						VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
						[req.body.net_id, req.body.case_type, req.body.first_name, req.body.last_name,
							req.body.email, req.body.phone, req.body.description, req.body.short_description,
							req.body.appt_active, req.body.appt_date, req.body.appt_time, req.body.appt_agent,
							req.body.sn, req.body.sn2, req.body.device_type, req.body.os, req.body.make,
							req.body.contact_pref, req.body.created_by, req.body.case_number],
						function (err, rows, fields) {
	                		db_connection.release();
	                    	if (err) {
	                        	res.send("Error with query");
								console.log(err);
	                    	} else {
	                        	res.send('Incident added to database');
	                    	}
                	});
            	}
            });
		})
		//Get all incidents
		.get(function(req, res) {
            db_connection.getConnection(function (err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    db_connection.query('SELECT * FROM incidents', function (err, rows, fields) {
                        db_connection.release();
                        if (err) {
                            console.log("Error with query");
                        } else {
                            res.send(rows);	// Returns all incidents
                        }
                    });
                }
            });
        })
		.put(function(req, res) { //expects string date
            db_connection.getConnection(function(err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    db_connection.query('SELECT * FROM incidents WHERE appt_date = ?', req.body.date, function(err, result){
                        db_connection.release();
                        if (err) {
                            console.log("Error with query");
                        } else {
                            res.send(result); // Returns incidents with requested id
                        }
                    });
                }
            });
		});

	//REGISTERING ROUTES ---------------------
	return incidentRouter;
};
