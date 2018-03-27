//******************************************************************************
//******************************************************************************
//	File Name: tutorialCtrl.js
//******************************************************************************
//******************************************************************************
angular.module('gitCtrl', [])
	.controller('gitController', function($scope) {
		$scope.tutorial_name = "Git & GitHub Tutorial"

		form = 'app/views/tutorial-pages/git-pages/git-intro.html';
		$scope.section_name = 'Introduction';
		$scope.template_form = function(){
			return form;
		}

		// Function for the submit button
		$scope.to_intro = function(isValid){
			form = 'app/views/tutorial-pages/git-pages/git-intro.html';
			$scope.section_name = 'Introduction';
		}

		$scope.to_section_one = function(){
			form = 'app/views/tutorial-pages/git-pages/git-section-one.html';
			$scope.section_name = 'Installing Git & Signing Up For GitHub';
		}

		$scope.to_section_two = function(){
			form = 'app/views/tutorial-pages/git-pages/git-section-two.html';
			$scope.section_name = 'Setting Up Git';
		}
	})
