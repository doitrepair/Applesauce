//******************************************************************************
//******************************************************************************
// Module Description: incidentService.js
// This module creates the http calls necessary to retreive data from the
// mySQL database
//******************************************************************************
//******************************************************************************
angular.module('incidentService', ['infoService'])
	.factory('incidentFactory', function($http, userData, apptData) {

		incidentFactory.createIncident = function(case_type, created_by) {
			if(userData.netId == null) userData.netId = 'null';
			if(userData.first_name == null){
				userData.first_name = 'null';
				userData.last_name = 'null';
			}
			if(apptData.agent == null){
				apptData.agent = {};
				apptData.agent.NetID = 'null';
				apptData.appt_active = 0;
				apptData.dates = '0000-00-00';
				apptData.time = '00:00:00';
			} else {
				apptData.appt_active = 1;
			}

			if(userData.sn == null) userData.sn = 'null';
			if(userData.sn2 == null) userData.sn2 = 'null';
			if(userData.case_number == null) userData.case_number = 'null';

			return $http.post('/api/incident/', {
					'net_id': userData.netId,
					'case_type': case_type,
					'first_name': userData.first_name,
					'last_name': userData.last_name,
					'email': userData.email,
					'phone': userData.tel,
					'description': userData.description,
					'short_description': userData.short,
					'appt_active': apptData.appt_active,
					'appt_date': apptData.appt_dates,
					'appt_time': apptData.appt_time,
					'appt_agent': apptData.agent.NetID,
					'sn': userData.sn,
					'sn2': userData.sn2,
					'device_type': userData.device_type,
					'os': userData.os,
					'make': userData.make,
					'contact_pref': userData.contactPref,
					'created_by': created_by,
					'case_number': userData.case_number
				});
		};

		incidentFactory.getApptByDate = function(date) {
			return $http.post('/api/incident/', {
				'date': date
			});
		};

		return incidentFactory;
	});
