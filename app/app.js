'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.home',
  'myApp.homeService',
  'myApp.index',
  'myApp.profile'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});

  /*$routeProvider.when('/profile', {
    templateUrl: "profile/profile.html"
  });*/

}])
.run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.showSection = $location.path() !== "/";
  });
});
