'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap', 'ngAside', 'slick', 'infinite-scroll'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$aside', 'homeService',function($scope, $aside, homeService) {

  $scope.content = [];
  $scope.originContent;

  homeService.getContent().then(function(data) {
    $scope.originContent = data;
    $scope.content.push(data[0]);
    $scope.content.push(data[1]);
    $scope.content.push(data[2]);
  });

  $scope.loadMore = function() {
    $scope.content.push($scope.originContent[$scope.content.length]);
  };

}]);
