'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap', 'ngAside'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'Home1Ctrl'
  });
}])

.controller('Home1Ctrl', ['$scope','$aside',function($scope, $aside) {
  var asideInstance = $aside.open({
      templateUrl: 'aside/aside.html',
      controller: 'AsideCtrl',
      placement: 'left',
      size: 'lg'
    });
}]);
