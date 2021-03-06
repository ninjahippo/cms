'use strict';

angular.module('NinjahippoCMS').controller('SignInCtrl', function ($scope, Restangular, $filter, Auth, $location, $rootScope) {
  function login(u) {
    Auth.login(u).then(function(response){
      if (response.error) {
        $scope.errors = []
        if (response.error == 'You need to sign in or sign up before continuing.') {
          $scope.errors.push('Invalid Email or Password');
        } else {
          $scope.errors.push(response.error);
        }
        return
      } else {
        $location.path('/dashboard')
      }
    });
  }

  $scope.login = function(user) {
    login(user);
  }
});