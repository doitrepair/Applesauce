// REQUIRED PACKAGES ===========================================================
var bodyParser 	= require('body-parser');
var nodemailer = require("nodemailer");
var email 		= require('../config/email-config');

// questionsRouter FUNCTION ==========================================================
module.exports = function(app, express) {

	var emailRouter = express.Router();

	/*------------------SMTP Over-----------------------------*/

	/*------------------Routing Started ------------------------*/
	// ROUTES FOR /api/email -----------------------------------------------
	emailRouter.route('/')
		.post(function(req, res) {

			var cherwell_message = JSON.stringify(req.body.cherwell_message);

			var smtpTransport = nodemailer.createTransport({
				service: email.service,
				host: email.host,
				port: email.port,
				secure: email.secure, //use TLS
				auth: {
					user: email.user,
					pass: email.pass
				}
			});

			var wiscitOptions={
				to : 'wiscit@doit.wisc.edu',
				from: email.email,
				subject : 'Online Repair',
				html : cherwell_message
			};
			console.log(wiscitOptions);
			smtpTransport.sendMail(wiscitOptions, function(error, response){
				if(error){
					console.log(error);
					res.end("error");
				}else{
					console.log("Message sent: " + response.message);
					res.end("sent");
				}
			});


			var userOptions={
				to : req.body.user_email,
				from: email.email,
				subject : req.body.subject,
				html : req.body.user_message
			};
			console.log(userOptions);
			smtpTransport.sendMail(userOptions, function(error, response){
				if(error){
					console.log(error);
					res.end("error");
				}else{
					console.log("Message sent: " + response.message);
					res.end("sent");
				}
			});
		});
	return emailRouter;
};
