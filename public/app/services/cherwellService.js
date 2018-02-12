//******************************************************************************
//******************************************************************************
// Module Description: cherwellService.js
// This module saves all of the data from a repair and sends it to WiscIT
//
//******************************************************************************
//******************************************************************************
angular.module('cherwellService', ['infoService', 'incidentService'])
	.factory('cherwellFactory', function($http, userData, incidentFactory) {
		var cherwellFactory = {};

		//**********************************************************************
		// Title: Create Cherwell Case
		//**********************************************************************
		//	Summary: this sends an email to wiscit to be handled by our WiscIT
		//  		email handler (managed by Chris Grosspietsch) in order
		//  		to create a cherwell case
		//
		//	Parameters:
		//		repair		A correctly formatted string to send to cherwell
		//**********************************************************************
		cherwellFactory.createCherwellCase = function(repair){
			return $http.post('/api/email/', { repair: repair });

		};

		//**********************************************************************
		// Title: Build Cherwell Case
		//**********************************************************************
		//	Summary: this formats and sends an email to wiscit to be handled by
		//  		our WiscIT email handler (managed by Chris Grosspietsch)
		//  		in order to create a cherwell case
		//
		//	Parameters:
		//		repair_object	an object containing the fields used in by cherwell
		//		note 			a string that can be prepended to the cherwell
		// 						description field
		//**********************************************************************
		cherwellFactory.buildCherwellCase = function(){
			// Default text in the repair
			var description_suffix = "; NEXT AGENT - please update any 'Needs Update' fields as well as the Approved Price Ceiling and Repair Coverage";

			// Check if Apple or Dell to see if a power adapter should be checked in
			if(userData.make === 'Dell' || userData.make === 'Apple'){
				userData.pa = 'No';
			} else {
				userData.pa = 'Yes';
			}

			// Check if any of these are undefined, which cherwell will need
			if (userData.netId == undefined || userData.contactPref == undefined || userData.os == undefined)
				return;

			// construct the description field
			userData.description += description_suffix;
			// construct the repair email, it must be in this format for cherwell
			// to correctly interpret it. To add a field, contact Chris Grosspietsch
			var repair_email =
				`<br>description_key:`+ userData.description +`--eol<br>
				short_description_key: `+ userData.short +`--eol<br>
				net_id_key:  `+ userData.netId +`--eol<br>
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

			// Optionally specify an owner for the case, otherwise it just gets
			// assigned to no one (but still is assigned to the ServiceDesk group)
			if(userData.owner_netid != undefined) {
				repair_email += 'owner_net_id_key:  '+ userData.owner_netid +'--eol<br>';
			}

			console.log('submitted');
			console.log(repair_email);
			cherwellFactory.createCherwellCase(repair_email.replace(/\n/g, '').replace(/\t/g, ''));
			console.log('logged case');
			incidentFactory.createIncident();
		}
		return cherwellFactory;
	});
