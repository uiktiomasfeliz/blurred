'use strict';

angular.module('myApp.home', ['ngRoute', 'ngAside'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'Home1Ctrl'
  });
}])

.controller('Home1Ctrl', [function($scope, $aside) {
  var asideInstance = $aside.open({
      templateUrl: 'aside.html',
      controller: 'AsideCtrl',
      placement: 'left',
      size: 'lg'
    });
}]);
