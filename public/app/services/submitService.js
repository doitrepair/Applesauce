//******************************************************************************
//******************************************************************************
// Module Description: submitService.js
// This module saves all of the data from a repair and sends it to WiscIT
//
//******************************************************************************
//******************************************************************************
angular.module('submitService', ['infoService', 'incidentService', 'acmeService','configService'])
	.factory('submitFactory', function($http, userData, apptData, incidentFactory, acmeFactory, env) {
		var submitFactory = {};

		//**********************************************************************
		// Title: Send Emails
		//**********************************************************************
		//	Summary: this sends an email to wiscit to be handled by our WiscIT
		//  		email handler (managed by Chris Grosspietsch) in order
		//  		to create a cherwell case as well as it sends confirmation
		// 			email to the user
		//
		//	Parameters:
		//		cherwell_text	A correctly formatted string to send to cherwell
		//		cherwell_text	A html message to send to the user
		//**********************************************************************
		submitFactory.sendEmails = function(cherwell_text, user_text){
			return $http.post('/api/email/',
				{
					cherwell_message:	cherwell_text,
					user_message: 		user_text,
					subject:			userData.email_subject,
					user_email:			userData.email
				});

		};

		//**********************************************************************
		// Title: Build Cherwell Email
		//**********************************************************************
		//	Summary: this formats an email to wiscit to be handled by
		//  		our WiscIT email handler (managed by Chris Grosspietsch)
		//  		in order to create a cherwell case
		//**********************************************************************
		submitFactory.buildCherwellEmail = function(){
			var description_suffix = "; NEXT AGENT - please update any 'Needs Update' fields as well as the Approved Price Ceiling and Repair Coverage";

			// Check if Apple or Dell to see if a power adapter should be checked in
			if(userData.make === 'Dell' || userData.make === 'Apple'){
				userData.pa = 'No';
			} else {
				userData.pa = 'Yes';
			}

			// Check if any of these are undefined, which cherwell will need
			if ((userData.netId == undefined && userData.first == undefined) || userData.contactPref == undefined || userData.os == undefined) {
				console.log('returning null');
				console.log(userData);
				return;
			}
			if (userData.netId == undefined) userData.description = "Created By: "+ userData.first + " " + userData.last + "; " + userData.description;
			// construct the description field
			userData.description += description_suffix;
			// construct the repair email, it must be in this format for cherwell
			// to correctly interpret it. To add a field, contact Chris Grosspietsch
			var cherwell_text =
				`<br>description_key:`+ userData.description +`--eol<br>
				short_description_key: `+ userData.short +`--eol<br>
				alt_cont_key: `+ userData.alt_contact +`--eol<br>
				os_key:  `+ userData.os +`--eol<br>
				make_key:  `+ userData.make +`--eol<br>
				model_key: Needs Update--eol<br>
				sn_key: `+userData.sn+`--eol<br>
				pa_key: `+userData.pa+`--eol<br>
				price_key: 1--eol<br>
				device_key:  `+ userData.device_type +`--eol<br>
				ship_to_key: `+ userData.ship_to +`--eol<br>
				contact_key:` + userData.contactPref+`--eol<br>`;

			if(userData.netId != undefined) {
				cherwell_text += 'net_id_key:  '+ userData.netId +'--eol<br>';
			} else {
				cherwell_text += 'net_id_key:  --eol<br>';
			}


			// Optionally specify an owner for the case, otherwise it just gets
			// assigned to no one (but still is assigned to the ServiceDesk group)
			if(userData.owner_netid != undefined) {
				cherwell_text += 'owner_net_id_key:  '+ userData.owner_netid +'--eol<br>';
			}
			return cherwell_text;
		}

		//**********************************************************************
		// Title: Build User Email
		//**********************************************************************
		//	Summary: this formats an email that is sent to the user
		//**********************************************************************
		submitFactory.buildUserEmail = function(){
			next_steps_dayton = '<p>NEXT STEPS:<ul><li>Stop by the DoIT Tech Store at 1210 W Dayton St.</li><li>If possible, we strongly recommend that you back up your data.</li><li><strong>Please bring your power adapter for any computers that are not Apple or Dell.</strong></li></ul></p>';
			next_steps_any = '<p>NEXT STEPS:<ul><li>Stop by one of our <a href="https://techstore.wisc.edu/locations/">DoIT Tech Store locations</a></li><li>If possible, we strongly recommend that you back up your data. For more information on backing up your data, checkout <a href="https://kb.wisc.edu/20504">the UW KnowledgeBase</a>.</li><li><strong>Please bring your power adapter for any computers that are not Apple or Dell.</strong></li></ul></p>';
			if(apptData.appt) {
				return "<h4>"+userData.header_message+"</h4>"+next_steps_dayton;
			} else {
				return "<h4>"+userData.header_message+"</h4>"+next_steps_any;
			}

		}

		submitFactory.submitCase = function(){
			if(env.prod|| env.post) {
				console.log('Submitting Repair');
				incidentFactory.createIncident();
				cherwell_text = submitFactory.buildCherwellEmail();
				user_text = submitFactory.buildUserEmail();
				submitFactory.sendEmails(cherwell_text.replace(/\n/g, '').replace(/\t/g, ''), user_text);
				if(apptData.appt) {
					console.log('Scheduling Appointment');
					acmeFactory.updateSched(apptData.time, apptData.time, apptData.date, apptData.agent.first, apptData.agent.last)
				}
			} else {
				console.log('Submission Deactivated');
			}
		}
		return submitFactory;
	});
