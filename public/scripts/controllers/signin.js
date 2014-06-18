'use strict';

angular.module('NinjahippoCMS').controller('SignInCtrl', function ($scope, Restangular, $filter, Auth, $location, $rootScope) {
  function login(u) {
    u = u || {};
    Auth.login(u).then(function(user){
      $location.path('/dashboard');
    })
  }

  $scope.login = function(user) {
    login(user)
  }

  login();
});