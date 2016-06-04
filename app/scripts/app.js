'use strict';

/**
 * @ngdoc overview
 * @name scriptureApp
 * @description
 * # scriptureApp
 *
 * Main module of the application.
 */
angular.module('scriptureApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/verses', {
        templateUrl: 'views/verses.html',
        controller: 'VersesCtrl'
      })
      .when('/verse', {
        templateUrl: 'views/verse.html',
        controller: 'VerseCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
