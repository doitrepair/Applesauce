//******************************************************************************
//******************************************************************************
// Module Description: submitRepair.js
// This module saves all of the data from a repair and sends it to WiscIT
//
//******************************************************************************
//******************************************************************************
angular.module('submitRepair', [])
	.factory('submitFactory', function($http) {
		var submitFactory = {};

		//**********************************************************************
		// Title: Submit Repair
		//**********************************************************************
		//	Summary: this function creates a repair object to be used by the
		//		repair controller
		//
		//	Parameters:
		//		id			the id of the repair to be collected from database
		//
		//	Returns:
		// 		This function returns a promise containing the db response
		//**********************************************************************
		submitFactory.submitRepair = function(repair){
			return $http.post('/api/email/', { repair: repair });

		};

		submitFactory.buildAndSubmitRepair = function($scope, note){
			var description_suffix = " - NEXT AGENT - please update any 'Needs Update' fields as well as the Approved Price Ceiling and Repair Coverage";

			if($scope.make === 'Dell' || $scope.make === 'Apple'){
				$scope.pa = 'No';
			} else {
				$scope.pa = 'Yes';
			}

			var alt_contact = 'Email='+$scope.email+' Phone='+$scope.tel;

			if ($scope.netId == undefined || $scope.contactPref == undefined || $scope.os == undefined)
				return;

			var full_description = note + $scope.description + description_suffix;
			var repair_email =
				`<br>description_key:`+ full_description +`--eol<br>
				short_description_key: `+ $scope.short +`--eol<br>
				net_id_key:  `+ $scope.netId +`--eol<br>
				os_key:  `+ $scope.os +`--eol<br>
				make_key:  `+ $scope.make +`--eol<br>
				model_key: Needs Update--eol<br>
				sn_key: `+$scope.sn+`--eol<br>
				pa_key: `+$scope.pa+`--eol<br>
				price_key: 1--eol<br>
				device_key:  `+ $scope.device_type +`--eol<br>
				ship_to_key: `+ $scope.ship_to +`--eol<br>
				contact_key:` + $scope.contactPref+`--eol<br>`;

			console.log('submitted');
			console.log(repair_email);
			submitFactory.submitRepair(repair_email.replace(/\n/g, '').replace(/\t/g, ''));
		}
		return submitFactory;
	});
