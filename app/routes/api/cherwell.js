// REQUIRED PACKAGES ===========================================================
var bodyParser 	= require('body-parser');
var nodemailer = require("nodemailer");
var config 		= require('../../../config/server-config');

// questionsRouter FUNCTION ==========================================================
module.exports = function(app, express) {

	var cherwellRouter = express.Router();

	/*var testCase = {
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
	};*/

	/*------------------SMTP Over-----------------------------*/

	/*------------------Routing Started ------------------------*/
	// ROUTES FOR /api/email -----------------------------------------------
	cherwellRouter.route('/')


		.post(function(req, res) {

			var text = JSON.stringify(req.body.repair);
			var smtpTransport = nodemailer.createTransport({
				service: "gmail",
				host: "smtp.gmail.com",
				auth: {
					user: config.email,
					pass: config.email_pw
				}
			});

			var mailOptions={
				to : 'essert@wisc.edu',//'wiscit@doit.wisc.edu',
				subject : 'Online Repair',
				html : text
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
	return cherwellRouter;
};
