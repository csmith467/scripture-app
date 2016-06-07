angular.module('scriptureApp')
  .factory('$scriptureData', function ($resource, $http) {

    var $scriptureData = {};

    // Get all verses
    $scriptureData.getVerses = function() {
      var user = "";

      var resource = $resource(
        '/api/verse',
        {},
        {
          get: {
            method: 'GET',
            isArray: true,
            params: {
              'user': user
            }
          }
        }
      );

      return resource;
    };

    // Save verses
    $scriptureData.saveVerse = function() {
      var user = "Craig";
      var resource = $resource(
        '/api/verse',
        {},
        {
          save: {
            method: 'POST',
            params: {
              user: user
            }
          }
        }
      );

      return resource;
    };

    return $scriptureData;

  });
