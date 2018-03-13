angular.module('mainCtrl', ['configService'])
	.controller('mainController', function($scope, prod_env, post) {
		$scope.prod = prod_env;
		$scope.post = post;
		$scope.post_message = "Cite Inactive";
		if($scope.post) $scope.post_message = "Cite Active";

		$scope.toggle_post = function(){
			post = ~post;
			$scope.post = post;
			if($scope.post) $scope.post_message = "Cite Active";
			else $scope.post_message = "Cite Inactive";
		}
	});
