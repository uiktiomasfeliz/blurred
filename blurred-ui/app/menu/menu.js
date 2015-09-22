'use strict';
app
.controller('MenuCtrl', ['$scope', '$window', 'Facebook', 'ngDialog', function($scope, $window, Facebook, ngDialog) {

//$ocLazyLoad.load('ngDialog'); // will load the predefined configuration
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

  $scope.userIsConnected = false;

  Facebook.getLoginStatus(function(response) {
    if (response.status == 'connected') {
      $scope.userIsConnected = true;
      $scope.me();
    }
  });

  /**
   * IntentLogin
   */
  $scope.IntentLogin = function() {
    if(!$scope.userIsConnected) {
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
      Facebook.api('/me?fields=id,name,picture,gender,photos', function(response) {
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

 /**
  * NGMODAL
  */
  $scope.openDialog = function () {
    //controller: 'InsideCtrl',
     var new_dialog = ngDialog.open({
       template: 'firstDialogId',
       className: 'ngdialog-theme-plain custom-width',
        data: {foo: 'some data'}
      });
       // example on checking whether created `new_dialog` is open
       /*$timeout(function() {
           console.log(ngDialog.isOpen(new_dialog.id));
       }, 2000)*/
     };

}])
;
