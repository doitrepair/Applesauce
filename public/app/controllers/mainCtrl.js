angular.module('mainCtrl', ['configService'])
	.controller('mainController', function($scope, env) {
		$scope.prod = env.prod;
		$scope.post = env.post;
		$scope.post_message = "Cite Inactive";
		if($scope.post) $scope.post_message = "Cite Active";

		$scope.toggle_post = function(){
			env.post = !env.post;
			$scope.post = env.post;
			if($scope.post) $scope.post_message = "Cite Active";
			else $scope.post_message = "Cite Inactive";
			console.log(env.post);
		}
	});
