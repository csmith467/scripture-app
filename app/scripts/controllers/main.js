'use strict';

angular.module('scriptureApp')
  .controller('MainCtrl', function ($scope, $cookies, $state) {
    $scope.logout = function() {
      $cookies.remove("passcode");
      $state.go("login");
    }
  });
