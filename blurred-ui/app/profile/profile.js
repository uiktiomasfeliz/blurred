'use strict';

app
.controller('profileCtrl', ['$scope', function($scope) {

  $scope.isEdit=false;

  $scope.showAlert = function(){
    alert("Hola");
  }

  $scope.troggleEdit = function(){
    //$scope.isEdit=true ? false : true;
    if($scope.isEdit){
        $scope.isEdit=false;
    }else{
      $scope.isEdit=true;
    }

  }

}]);
