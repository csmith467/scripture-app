angular.module('scriptureApp')
  .controller('VersesCtrl', function ($scope, $location, $scriptureData) {

    $scope.verses = [];

    // Get all verses
    $scriptureData.getVerses().getArray().$promise
    .then(function(data) {
      // Assign verses to global array
      $scope.verses = data;
    })

    // Navigate to verse
    $scope.goToVerse = function() {
      $location.path('verse');
    }

    // Save a new verse
    $scope.saveVerse = function() {
      $scriptureData.saveVerse().save(record).$promise
      .then(function(data) {
        console.log(data);
      })
    };

    // Save a new verse
    $scope.saveBook = function() {

      var record = {short: "Jon", book: "John", chapters: 2, verses: 1};
      $scriptureData.saveBook().save(record).$promise
      .then(function(data) {
        console.log(data);
      })
    };

    $scope.refreshVerses = function() {
      $scope.verses = [];
      // Get all verses
      $scriptureData.getVerses().getArray().$promise
      .then(function(data) {
        // Assign verses to global array
        $scope.verses = data;
      })
    }

  });
