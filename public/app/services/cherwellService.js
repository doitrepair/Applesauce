//******************************************************************************
//******************************************************************************
// Module Description: cherwellService.js
// This module saves all of the data from a repair and sends it to WiscIT
//
//******************************************************************************
//******************************************************************************
angular.module('cherwellService', [])
	.factory('cherwellFactory', function($http) {
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
		cherwellFactory.buildCherwellCase = function(repair_object, note){
			// Default text in the repair
			var description_suffix = " - NEXT AGENT - please update any 'Needs Update' fields as well as the Approved Price Ceiling and Repair Coverage";

			// Check if Apple or Dell to see if a power adapter should be checked in
			if(repair_object.make === 'Dell' || repair_object.make === 'Apple'){
				repair_object.pa = 'No';
			} else {
				repair_object.pa = 'Yes';
			}

			// Create a string to put in the alt contact field
			var alt_contact = 'Email='+repair_object.email+' Phone='+repair_object.tel;

			// Check if any of these are undefined, which cherwell will need
			if (repair_object.netId == undefined || repair_object.contactPref == undefined || repair_object.os == undefined)
				return;

			// construct the description field
			var full_description = note + repair_object.description + description_suffix;
			// construct the repair email, it must be in this format for cherwell
			// to correctly interpret it. To add a field, contact Chris Grosspietsch
			var repair_email =
				`<br>description_key:`+ full_description +`--eol<br>
				short_description_key: `+ repair_object.short +`--eol<br>
				net_id_key:  `+ repair_object.netId +`--eol<br>
				alt_cont_key: `+ repair_object.alt_contact +`--eol<br>
				os_key:  `+ repair_object.os +`--eol<br>
				make_key:  `+ repair_object.make +`--eol<br>
				model_key: Needs Update--eol<br>
				sn_key: `+repair_object.sn+`--eol<br>
				pa_key: `+repair_object.pa+`--eol<br>
				price_key: 1--eol<br>
				device_key:  `+ repair_object.device_type +`--eol<br>
				ship_to_key: `+ repair_object.ship_to +`--eol<br>
				contact_key:` + repair_object.contactPref+`--eol<br>`;

			// Optionally specify an owner for the case, otherwise it just gets
			// assigned to no one (but still is assigned to the ServiceDesk group)
			if(repair_object.owner_netid != undefined) {
				repair_email += 'owner_net_id_key:  '+ repair_object.owner_netid +'--eol<br>';
			}

			console.log('submitted');
			console.log(repair_email);
			cherwellFactory.createCherwellCase(repair_email.replace(/\n/g, '').replace(/\t/g, ''));
		}
		return cherwellFactory;
	});
