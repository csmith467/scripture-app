'use strict';

angular.module('scriptureApp')
  .controller('MainCtrl', function ($scope, $cookies, $state) {
    $scope.logout = function() {
      $cookies.remove("passcode");
      $state.go("login");
    }

    // Global function to show message bar
    $scope.showMessage = function(message, type) {
      // Set message text
      $("#messageBar").html(message);

      // Set background based on message type
      if (type == "info") {
        $("#messageBar").css("background", "#2196F3");
      } else if (type == "error") {
        $("#messageBar").css("background", "#F44336");
      }

      // Show message bar
      $("#messageBar").addClass('message-bar-show');
      setTimeout(function() {
         $("#messageBar").removeClass('message-bar-show');
      }, 3000);
    }
  });
