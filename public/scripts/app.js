'use strict';

var app = angular.module('NinjahippoCMS', [
    'restangular',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ng-rails-csrf',
    'Devise'
  ]);

app.config(['RestangularProvider', '$routeProvider', '$locationProvider', '$httpProvider', 'AuthProvider', function(RestangularProvider, $routeProvider, $locationProvider, $httpProvider, AuthProvider){
  $httpProvider.responseInterceptors.push('authInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: '/views/index.html',
      controller: 'IndexCtrl'
    })
    .when('/dashboard', {
      templateUrl: '/views/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .when('/signin', {
      templateUrl: '/views/signin.html',
      controller: 'SignInCtrl'
    })
    .when('/signup', {
      templateUrl: '/views/signup.html',
      controller: 'SignUpCtrl'
    })

    .when('/sites/new', {
      templateUrl: '/views/sites/new.html',
      controller: 'NewSiteCtrl'
    })
    .when('/sites/:slug', {
      templateUrl: '/views/sites/show.html',
      controller: 'ShowSiteCtrl'
    })
    .when('/sites/:slug/edit', {
      templateUrl: '/views/sites/edit.html',
      controller: 'EditSiteCtrl'
    })

    .when('/sites/:site_slug/pages/new', {
      templateUrl: '/views/pages/new.html',
      controller: 'NewPageCtrl'
    })
    .when('/sites/:site_slug/pages/:slug/edit', {
      templateUrl: '/views/pages/edit.html',
      controller: 'EditPageCtrl'
    })

    .otherwise({
      redirectTo: '/'
    });


    RestangularProvider.setBaseUrl('http://localhost:3000/v1');
    $locationProvider.html5Mode(true);
}]);

app.service('api', function($rootScope, $http) {
  this.getToken = function() {
    return $http({
      url: '/auth_token.json',
      method: 'GET'
    });
  };
});