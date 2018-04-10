angular.module('netReloadCtrl', [])
	.controller('netReloadController', function($route) {
    $route.reload();
  });
