//******************************************************************************
//******************************************************************************
//	File Name: tutorialCtrl.js
//******************************************************************************
//******************************************************************************
angular.module('gitCtrl', [])
	.controller('gitController', function($scope, $window) {
		$scope.tutorial_name = "Git & GitHub Tutorial"

		$scope.pages = [
			{
				form: 'app/views/tutorial-pages/git-pages/git-section-1.html',
				name: 'Set Up Git & GitHub'
			},
			{
				form: 'app/views/tutorial-pages/git-pages/git-section-2.html',
				name: 'Starting Git'
			},
			{
				form: 'app/views/tutorial-pages/git-pages/git-section-3.html',
				name: 'Commits & Branches'
			},
			{
				form: 'app/views/tutorial-pages/git-pages/git-section-4.html',
				name: 'Intro to Merges'
			},
			{
				form: 'app/views/tutorial-pages/git-pages/git-section-5.html',
				name: 'Merge Conflicts'
			}
		];

		var currPage = 0;
		$scope.section_name = $scope.pages[currPage].name;

		$scope.template_form = function(){
			if (currPage==$scope.pages.length){
				return 'app/views/tutorial-pages/git-pages/git-end.html';
			} else {
				return $scope.pages[currPage].form;
			}
		}

		$scope.jump_to_page = function(i){
			currPage = i;
			$window.scrollTo(0, 200);
			$scope.section_name = $scope.pages[currPage].name;
		}

		$scope.continue = function(){
			currPage = currPage + 1;
			$window.scrollTo(0, 200);
			if(currPage<$scope.pages.length){
				$scope.section_name = $scope.pages[currPage].name;
			} else {
				$scope.section_name = "Tutorial Completed!";
			}
		}

		$scope.back = function(){
			currPage = currPage - 1;
			$window.scrollTo(0, 200);
			$scope.section_name = $scope.pages[currPage].name;
		}
	})
