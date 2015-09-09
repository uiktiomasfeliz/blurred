'use strict';

angular.module('myApp.index', ['ngRoute', 'snapscroll'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'index/index.html',
    controller: 'Index1Ctrl'
  });
}])

.controller('Index1Ctrl', [function($scope, $aside) {
  var asideInstance = $aside.open({
      templateUrl: 'aside.html',
      controller: 'AsideCtrl',
      placement: 'left',
      size: 'lg'
    });
}]);
