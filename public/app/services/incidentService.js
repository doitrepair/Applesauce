//******************************************************************************
//******************************************************************************
// Module Description: incidentService.js
// This module creates the http calls necessary to retreive data from the
// mySQL database
//******************************************************************************
//******************************************************************************
angular.module('incidentService', ['infoService'])
	.factory('incidentFactory', function($http, userData, apptData) {

		var incidentFactory = {};

		incidentFactory.createIncident = function() {
			if(userData.netId == null) userData.netId = 'null';
			if(userData.first_name == null){
				userData.first_name = 'null';
				userData.last_name = 'null';
			}
			if(apptData.agent == null){
				apptData.agent = {};
				apptData.agent.netid = 'null';
				apptData.appt_active = 0;
				apptData.dates = '0000-00-00';
				apptData.time = '00:00:00';
			} else {
				apptData.appt_active = 1;
			}
			if( userData.admin_user == null ) userData.admin_user = 'non-admin';

			if(userData.sn == null) userData.sn = 'null';
			if(userData.sn2 == null) userData.sn2 = 'null';
			if(userData.case_number == null) userData.case_number = 'null';

			return $http.post('/api/incident/', {
					'net_id': userData.netId,
					'case_type': userData.case_type,
					'first_name': userData.first_name,
					'last_name': userData.last_name,
					'email': userData.email,
					'phone': userData.tel,
					'description': userData.description,
					'short_description': userData.short,
					'appt_active': apptData.appt_active,
					'appt_date': apptData.dates,
					'appt_time': apptData.time,
					'appt_agent': apptData.agent.netid,
					'sn': userData.sn,
					'sn2': userData.sn2,
					'device_type': userData.device_type,
					'os': userData.os,
					'make': userData.make,
					'contact_pref': userData.contactPref,
					'created_by': userData.admin_user,
					'case_number': userData.case_number
				});
		};

		incidentFactory.getApptByDateRange = function(begin, end) {
			return $http.put('/api/incident/', {
				'begin': begin,
				'end': end
			});
		};

		return incidentFactory;
	});
