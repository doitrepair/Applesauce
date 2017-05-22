// REQUIRED PACKAGES ===========================================================
var bodyParser 	= require('body-parser');
var nodemailer = require("nodemailer");
var config 		= require('../../../config');

// questionsRouter FUNCTION ==========================================================
module.exports = function(app, express) {

	var emailRouter = express.Router();

	var testCase = {
		description: "this is a description example <br> <br> here's a second line",
		short_description: "test",
		net_id: "essert",
		os: 'None',
		make: 'Apple',
		model: 'Other',
		sn: 'c02xxxxxxx',
		pa: 'No',
		price: '1',
		device: 'Notebook',
		ship_to: 'dayton',
		contact: 'Email'
	};
	var text = JSON.stringify(testCase);
	var smtpTransport = nodemailer.createTransport({
	    service: "gmail",
	    host: "smtp.gmail.com",
	    auth: {
	        user: config.email,
	        pass: config.email_pw
	    }
	});
	/*------------------SMTP Over-----------------------------*/

	/*------------------Routing Started ------------------------*/
	// ROUTES FOR /api/email -----------------------------------------------
	emailRouter.route('/')


		.get(function(req, res) {
			var mailOptions={
				to : 'essert@wisc.edu',
				subject : 'test',
				text : text
			};
			console.log(mailOptions);
			smtpTransport.sendMail(mailOptions, function(error, response){
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
