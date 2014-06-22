'use strict';

angular.module('NinjahippoCMS').controller('SignUpCtrl', function ($scope, Restangular, $filter, Auth, $location, $rootScope) {
  $scope.register = function(user) {
    Auth.register(user).then(function(response){
      $location.path('/dashboard')
    }, function(error) {
      $scope.errors = [];
      var errors = error.data.errors
      for (var i in errors) {
        $scope.errors.push(i + ': ' + errors[i])
      }
    });
  };
});