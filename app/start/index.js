'use strict';

angular.module('myApp.index', ['ngRoute', 'snapscroll'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'index/index.html',
    controller: 'Index1Ctrl'
  });
}])

.controller('Index1Ctrl', ['$scope',function($scope) {

}]);
