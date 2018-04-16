angular.module('popupModalCtrl', ['acmeService', 'apptService', 'infoService', 'filters'])
.controller('popupModalCtrl', function($scope, $mdDialog, userData, apptData, submitFactory) {
  $scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showConfirm = function(ev, item, this_week) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure this is the appointment you want?')
          .textContent('Double check that you appointment day and time is correct before continuing.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('CONTINUE') //ng-click="book_appt(item, this_week)">{{ item.day }} {{ item.time | time }}</button>
          .cancel('BACK');

    $mdDialog.show(confirm).then(function() {
      console.log("book appt");
			if(item.active){
				console.log("active");
				// Check which week is displayed to user
				var k = this_week ? 0 : 1;
				// Update the agents and date
				apptData.appt	= true;
				apptData.agent 	= item.agents[0];
				apptData.date  = item.date;
				apptData.day 	= item.day;
				apptData.time 	= item.time;
				apptData.title 	= item.day + ", " + item.friendly_date + " at " + item.time;

				userData.header_message = "You have successfully created an Appoinment with the DoIT Tech Store on "+apptData.title;
				$scope.header_message = userData.header_message;
				userData.description = "Appointment on "+apptData.title + "; " + userData.description;
				userData.owner_netid = apptData.agent.netid;
				submitFactory.submitCase();

				form = 'app/views/appt-pages/appt-success.html';
    }
  }, function() {
      $scope.status = 'Double check';
    });
  };

  $scope.showPrerenderedDialog = function(ev) {
    $mdDialog.show({
      contentElement: '#myDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
});
