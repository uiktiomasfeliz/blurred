'use strict';

angular.module('myApp.index', ['ngRoute', 'swipe', 'snapscroll'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'index/index.html',
    controller: 'Index1Ctrl'
  });
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
.controller('Index1Ctrl', ['$scope','$window',function($scope, $window) {
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
}])
;
