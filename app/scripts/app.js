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
    'ngTouch',
    'ui.router'
  ])
  .run(['$rootScope', '$state', '$cookies', function($rootScope, $state, $cookies) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;
      if (requireLogin && typeof $cookies.get("passcode") === 'undefined') {
        event.preventDefault();
        $state.go("login");
      }
    });
    
  }])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      data: {
        requireLogin: false
      }
    })
    .state('home', {
      url: "/",
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      data: {
        requireLogin: true
      }
    })
    .state('verse', {
      url: "/verse/:id",
      templateUrl: 'views/verse.html',
      controller: 'VerseCtrl',
      params: {
        id: null
      },
      data: {
        requireLogin: true
      }
    })
    .state('verses', {
      url: "/verses",
      templateUrl: 'views/verses.html',
      controller: 'VersesCtrl',
      data: {
        requireLogin: true
      }
    });
  });
