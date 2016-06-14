angular.module('scriptureApp')
  .directive('versePicker', function($scriptureData, $state, $cookies) {

    var versePicker = {
      templateUrl: 'views/directives/verse-picker.html',
      restrict: 'E',
      replace: true
    };

    versePicker.link = function($scope) {

      $scope.pickerTitle = "";
      $scope.pickerDirections = "";
      $scope.pickerBooks = [];
      $scope.pickerChapters = [];
      $scope.pickerVerses = [];

      $scope.selectedBook = [];
      $scope.currentBook = "";
      $scope.currentChapter = "";
      $scope.currentVerse = "";

      $scope.showBooks = false;
      $scope.showChapters = false;
      $scope.showVerses = false;

      $scope.showPicker = function() {
        // Drop down
        $(".add-verse-container").addClass("add-verse-container-show");

        // Get books from database
        $scriptureData.getBooks().get().$promise
        .then(function(data) {
          $scope.books = data;
          $scope.initBook();
        })
      };

      $scope.initBook = function() {
        // Show/hide elements
        $scope.showBooks = true;
        $scope.showChapters = false;
        $scope.showVerses = false;
        // Set headers
        $scope.pickerTitle = "";
        $scope.pickerDirections = "Select a book..."
      }

      // CLose the verse picker
      $scope.closePicker = function() {
        $(".add-verse-container").removeClass("add-verse-container-show");
      };

      // Select a book
      $scope.selectBook = function(book) {
        // Show/hide elements
        $scope.showBooks = false;
        $scope.showChapters = true;
        $scope.showVerses = false;
        // Clear array
        $scope.pickerChapters = [];
        $scope.selectedBook = [];
        // Populate chapter array
        for (var i = 1; i <= book.chapters; i++) {
          $scope.pickerChapters.push(i);
        }
        $scope.currentBook = book.name;
        $scope.selectedBook = book;
        // Set headers
        $scope.pickerTitle = $scope.currentBook;
        $scope.pickerDirections = "Select a chapter..."
      };

      // Select a chapter
      $scope.selectChapter = function(chapter) {
        // Show/hide elements
        $scope.showBooks = false;
        $scope.showChapters = false;
        $scope.showVerses = true;

        $scope.currentChapter = chapter;

        // Set headers
        $scope.pickerTitle = $scope.currentBook + " " + chapter;
        $scope.pickerDirections = "Select a verse..."

        // Get number of verses from database
        $scriptureData.getNumberVerses($scope.currentBook, $scope.currentChapter).get().$promise
        .then(function(data) {
          // Clear array
          $scope.pickerVerses = [];
          // Populate verses array
          for (var i = 1; i <= data[0].verses; i++) {
            $scope.pickerVerses.push(i);
          }
        });

      };

      // Select a verse
      $scope.selectVerse = function(verse) {

        $scope.currentVerse = verse;

        $scope.nextSteps();
      };

      $scope.nextSteps = function() {
        if ($state.is("verses")) {

          var verseRecord = {
            passcode: $cookies.get("passcode"),
            book: $scope.currentBook,
            chapter: $scope.currentChapter,
            verse: $scope.currentVerse
          }

          // Save verse
          $scriptureData.saveVerse().save(verseRecord).$promise
          .then(function(data) {
            $scope.closePicker();
            $scope.refreshVerses();
          });
        }

      };

      $scope.backPicker = function() {
        if ($scope.showChapters) {
          $scope.initBook();
        } else if ($scope.showVerses) {
          $scope.selectBook($scope.selectedBook);
        }
      };

    };

    return versePicker;

  });
