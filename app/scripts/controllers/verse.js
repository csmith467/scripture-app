angular.module('scriptureApp')
  .controller('VerseCtrl', function ($scope, $location) {

    $scope.verse = "";

    $scope.navigate = function(page) {
      $location.path(page);
    }

    $scope.getVerse = function() {

      var data = {
        p: "Philippians4:6-7",
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
              $scope.verse = "\"" + verses.join(" ") + "\"";
              $scope.$apply();
          },
          error:function(){
              console.log("An error occured.")
           },
      });
    };

    $scope.getVerse();
  });
