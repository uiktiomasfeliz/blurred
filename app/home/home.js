'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap', 'ngAside'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$aside', 'homeService',function($scope, $aside, homeService) {

  var json1 = homeService.getContent().then(function(data) {
    console.log(data);
  });

}]);
