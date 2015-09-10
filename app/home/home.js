'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap', 'ngAside', 'slick'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$aside', 'homeService',function($scope, $aside, homeService) {

  homeService.getContent().then(function(data) {
    $scope.content = data;
    console.log($scope.content);
  });

}]);
