'use strict';

angular.module('myApp.index', ['ngRoute', 'swipe', 'snapscroll', 'oc.lazyLoad', 'facebook'])

.config(['$routeProvider', '$ocLazyLoadProvider', 'FacebookProvider', function($routeProvider, $ocLazyLoadProvider, FacebookProvider) {
  $routeProvider.when('/', {
    templateUrl: 'index/index.html',
    controller: 'Index1Ctrl'/*,
    resolve: {
      loadMyPlugins: ['$ocLazyLoad', function($ocLazyLoad) {
      // you can lazy load files for an existing module
             return $ocLazyLoad.load([
                {
                  name: 'facebook',
                  files: ['bower_components/angular-facebook/lib/angular-facebook.js']
                }
             ]);
        }
      ]
    }*/
  });

  FacebookProvider.init('1574520766164734');

}])
//snapscroll directive for keyboards!
.directive('keyboardKeys', ['$document', function ($document) {
  return {
    restrict: 'A',
    link: function (scope) {
      var keydown = function (e) {
        if (e.keyCode === 38) {
          e.preventDefault();
          scope.$emit('arrow-up');
        }
        if (e.keyCode === 40) {
          e.preventDefault();
          scope.$emit('arrow-down');
        }
      };
      $document.on('keydown', keydown);
      scope.$on('$destroy', function () {
        $document.off('keydown', keydown);
      });
    }
  }
}])
.controller('Index1Ctrl', ['$scope', '$window', 'Facebook', function($scope, $window, Facebook) {
    //snapscroll settings
    var index = parseInt($window.location.hash.slice(1), 10);
    $scope.snapAnimation = false; // turn animation off for the initial snap on page load
    if (index && angular.isNumber(index)) {
      $scope.snapIndex = index;
    } else {
      $scope.snapIndex = 0;
    }
    $scope.$on('arrow-up', function () {
      $scope.$apply(function () {
        $scope.snapIndex--;
      });
    });
    $scope.$on('arrow-down', function () {
      $scope.$apply(function () {
        $scope.snapIndex++;
      });
    });
    $scope.swipeUp = function () {
      $scope.snapIndex++;
    };
    $scope.swipeDown = function () {
      $scope.snapIndex--;
    };
    $scope.afterSnap = function (snapIndex) {
      $scope.snapAnimation = true; // turn animations on after the initial snap
      //$window.location.hash = snapIndex;
    };

    //facebook
    $scope.login = function() {
      // From now on you can use the Facebook service just as Facebook api says
      Facebook.login(function(response) {
        // Do something with response.
      });
    };

    $scope.getLoginStatus = function() {
      Facebook.getLoginStatus(function(response) {
        if(response.status === 'connected') {
          $scope.loggedIn = true;
        } else {
          $scope.loggedIn = false;
        }
      });
    };

    $scope.me = function() {
      Facebook.api('/me', function(response) {
        $scope.user = response;
      });
    };

}])
;
