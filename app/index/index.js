'use strict';

angular.module('myApp.index', ['ngRoute', 'swipe', 'snapscroll', 'oc.lazyLoad', 'facebook'])

.config(['$routeProvider', '$ocLazyLoadProvider', 'FacebookProvider', function($routeProvider, $ocLazyLoadProvider, FacebookProvider) {
  $routeProvider.when('/', {
    templateUrl: 'index/index.html',
    resolve: {
      loadMyPlugins: ['$ocLazyLoad', function($ocLazyLoad) {
      // you can lazy load files for an existing module
             return $ocLazyLoad.load([
                {
                  files: ['index/indexDirective.js']
                }
             ]);
        }
      ]
    },
    controller: 'Index1Ctrl'
  });

  FacebookProvider.init('873001566117790');

}])
//snapscroll directive for keyboards!
/*
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
*/
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


      /**
       * FACEBOOK START HERE
       */

       // Define user empty data :/
      $scope.user = {};

      // Defining user logged status
      $scope.logged = false;

      // And some fancy flags to display messages upon user status change
      $scope.byebye = false;
      $scope.salutation = false;

      /**
       * Watch for Facebook to be ready.
       * There's also the event that could be used
       */
      $scope.$watch(
        function() {
          return Facebook.isReady();
        },
        function(newVal) {
          if (newVal)
            $scope.facebookReady = true;
        }
      );

      var userIsConnected = false;

      Facebook.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          userIsConnected = true;
        }
      });

      /**
       * IntentLogin
       */
      $scope.IntentLogin = function() {
        if(!userIsConnected) {
          $scope.login();
        }
      };

      /**
       * Login
       */
       $scope.login = function() {
         Facebook.login(function(response) {
          if (response.status == 'connected') {
            $scope.logged = true;
            $scope.me();
          }

        });
       };

       /**
        * me
        */
        $scope.me = function() {
          Facebook.api('/me', function(response) {
            /**
             * Using $scope.$apply since this happens outside angular framework.
             */
            $scope.$apply(function() {
              $scope.user = response;
            });

          });
        };

      /**
       * Logout
       */
      $scope.logout = function() {
        Facebook.logout(function() {
          $scope.$apply(function() {
            $scope.user   = {};
            $scope.logged = false;
          });
        });
      }

      /**
       * Taking approach of Events :D
       */
      $scope.$on('Facebook:statusChange', function(ev, data) {
        console.log('Status: ', data);
        if (data.status == 'connected') {
          $scope.$apply(function() {
            $scope.salutation = true;
            $scope.byebye     = false;
          });
        } else {
          $scope.$apply(function() {
            $scope.salutation = false;
            $scope.byebye     = true;

            // Dismiss byebye message after two seconds
            $timeout(function() {
              $scope.byebye = false;
            }, 2000)
          });
        }


      });

      /**
       * FACEBOOK END HERE
       */

}])
;
