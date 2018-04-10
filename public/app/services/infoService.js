//******************************************************************************
//******************************************************************************
// Module Description: infoService.js
//******************************************************************************
//******************************************************************************
angular.module('infoService', [])
	.value('userData', {})
	.value('apptData', {'appt': false})
	.factory('netIdFactory', function($http) {
		var netIdFactory = {};
		netIdFactory.getNetId = function() {
			return $http.get('/Shibboleth.sso/Session.json');
		};
		return netIdFactory;
	});
