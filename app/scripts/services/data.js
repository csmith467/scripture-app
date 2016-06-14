angular.module('scriptureApp')
  .factory('$scriptureData', function ($resource, $http, $cookies) {

    var $scriptureData = {};

    // Get verse
    $scriptureData.getUser = function(passcode) {

      var resource = $resource(
        '/api/user/:passcode',
        {
          passcode: passcode
        },
        {
          getArray: {
            method: 'GET',
            isArray: true,
            params: {}
          }
        }
      );

      return resource;
    };

    // Get all verses
    $scriptureData.getVerses = function() {
      var passcode = $cookies.get("passcode");

      var resource = $resource(
        '/api/verse',
        {},
        {
          getArray: {
            method: 'GET',
            isArray: true,
            params: {
              'passcode': passcode
            }
          }
        }
      );

      return resource;
    };

    // Get verse
    $scriptureData.getVerse = function(id) {
      var passcode = $cookies.get("passcode");

      var resource = $resource(
        '/api/verse/:id',
        {
          id: id
        },
        {
          get: {
            method: 'GET',
            params: {
              'passcode': passcode
            }
          }
        }
      );

      return resource;
    };

    // Save verses
    $scriptureData.saveVerse = function() {
      var passcode = $cookies.get("passcode");

      var resource = $resource(
        '/api/verse',
        {},
        {
          save: {
            method: 'POST',
            params: {
              'passcode': passcode
            }
          }
        }
      );

      return resource;
    };

    // Get all books
    $scriptureData.getBible = function() {
      var passcode = $cookies.get("passcode");

      var resource = $resource(
        '/api/bible',
        {},
        {
          get: {
            method: 'GET',
            isArray: true,
            params: {
              'passcode': passcode
            }
          }
        }
      );

      return resource;
    };

    // Get all books
    $scriptureData.getBooks = function() {

      var resource = $resource(
        '/api/book',
        {},
        {
          get: {
            method: 'GET',
            isArray: true,
            params: {}
          }
        }
      );

      return resource;
    };

    // Get verse
    $scriptureData.getNumberVerses = function(book, chapter) {

      var resource = $resource(
        '/api/bible/verses',
        {},
        {
          get: {
            method: 'GET',
            isArray: true,
            params: {
              'book': book,
              'chapter': chapter
            }
          }
        }
      );

      return resource;
    };

    // Save verses
    $scriptureData.saveBook = function() {

      var resource = $resource(
        '/api/bible',
        {},
        {
          save: {
            method: 'POST',
            params: {}
          }
        }
      );

      return resource;
    };

    return $scriptureData;

  });
