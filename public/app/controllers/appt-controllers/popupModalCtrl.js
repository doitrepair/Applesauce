angular.module('dialogDemo1', ['ngMaterial'])

.controller('popupModalCtrl', function($scope, $mdDialog) {
  $scope.status = '  ';
  $scope.customFullscreen = false;

  // $scope.showAlert = function(ev) {
  //   // Appending dialog to document.body to cover sidenav in docs app
  //   // Modal dialogs should fully cover application
  //   // to prevent interaction outside of dialog
  //   $mdDialog.show(
  //     $mdDialog.alert()
  //       .parent(angular.element(document.querySelector('#popupContainer')))
  //       .clickOutsideToClose(true)
  //       .title('This is an alert title')
  //       .textContent('You can specify some description text in here.')
  //       .ariaLabel('Alert Dialog Demo')
  //       .ok('Got it!')
  //       .targetEvent(ev)
  //   );
  // };

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

  // $scope.showPrompt = function(ev) {
  //   // Appending dialog to document.body to cover sidenav in docs app
  //   var confirm = $mdDialog.prompt()
  //     .title('What would you name your dog?')
  //     .textContent('Bowser is a common name.')
  //     .placeholder('Dog name')
  //     .ariaLabel('Dog name')
  //     .initialValue('Buddy')
  //     .targetEvent(ev)
  //     .required(true)
  //     .ok('Okay!')
  //     .cancel('I\'m a cat person');
  //
  //   $mdDialog.show(confirm).then(function(result) {
  //     $scope.status = 'You decided to name your dog ' + result + '.';
  //   }, function() {
  //     $scope.status = 'You didn\'t name your dog.';
  //   });
  // };

  // $scope.showAdvanced = function(ev) {
  //   $mdDialog.show({
  //     controller: DialogController,
  //     templateUrl: 'dialog1.tmpl.html',
  //     parent: angular.element(document.body),
  //     targetEvent: ev,
  //     clickOutsideToClose:true,
  //     fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
  //   })
  //   .then(function(answer) {
  //     $scope.status = 'You said the information was "' + answer + '".';
  //   }, function() {
  //     $scope.status = 'You cancelled the dialog.';
  //   });
  // };

  // $scope.showTabDialog = function(ev) {
  //   $mdDialog.show({
  //     controller: DialogController,
  //     templateUrl: 'tabDialog.tmpl.html',
  //     parent: angular.element(document.body),
  //     targetEvent: ev,
  //     clickOutsideToClose:true
  //   })
  //       .then(function(answer) {
  //         $scope.status = 'You said the information was "' + answer + '".';
  //       }, function() {
  //         $scope.status = 'You cancelled the dialog.';
  //       });
  // };

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
