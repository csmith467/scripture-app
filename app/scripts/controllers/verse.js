angular.module('scriptureApp')
  .controller('VerseCtrl', function ($scope, $location, $stateParams, $scriptureData) {

    $scope.book = "";
    $scope.chapter = "";
    $scope.verse = "";
    $scope.verseReference = "";
    $scope.verseText = "";

    // Get verse from database
    $scope.getVerse = function() {
      $scriptureData.getVerse($stateParams.id).get().$promise
      .then(function(data) {
        $scope.book = data.book;
        $scope.chapter = data.chapter;
        $scope.verse = data.verse;
        $scope.getVerseText();
      })

    };

    // Get verse text from API
    $scope.getVerseText = function() {

      var data = {
        p: $scope.book + $scope.chapter + ":" + $scope.verse,
        v: "asv"
      }

      jQuery.ajax({
          url:'http://getbible.net/json',
          dataType: 'jsonp',
          data: data,
          jsonp: 'getbible',
          success:function(json){
              var verses = [];
              angular.forEach(json.book[0].chapter, function(object, key) {
                verses.push(object.verse);
              });
              $scope.verseText = "\"" + verses.join(" ") + "\"";

              $scope.verseReference = $scope.book + " " + $scope.chapter + ":" + $scope.verse,

              $scope.$apply();
          },
          error:function(){
              console.log("An error occured.")
           },
      });
    };

    $scope.getVerse();
  });
