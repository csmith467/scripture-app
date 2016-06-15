'use strict';

angular.module('scriptureApp')
  .controller('LoginCtrl', function ($scope, $cookies, $state, $scriptureData) {

    $scope.passcode = "";

    $scope.login = function() {
      $scriptureData.getUser($scope.passcode).getArray().$promise
      .then(function(data) {
        if (data.length >= 1) {
          $cookies.put("passcode", $scope.passcode);
          $state.go('home');
        } else {
          $scope.$parent.showMessage("Incorrect password", "error");
          $scope.passcode = "";
        }
      })
    }

    $scope.selectNumber = function(num) {
      if ($scope.passcode.length < 4) {
        $scope.passcode += num;
        if ($scope.passcode.length == 4) {
          $scope.login();
        }
      }
    }

  });
