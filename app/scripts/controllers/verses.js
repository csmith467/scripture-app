angular.module('scriptureApp')
  .controller('VersesCtrl', function ($scope, $location) {
    $scope.goToVerse = function() {
      $location.path('verse');
    }
  });
