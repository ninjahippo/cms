'use strict';

angular.module('NinjahippoCMS').controller('SignUpCtrl', function ($scope, Restangular, $filter, Auth, $location, $rootScope) {
  $scope.register = function(user) {
    Auth.register(user).then(function(user){
      $location.path('/dashboard');
    }, function(error) {
      console.log(error);
    })
  };
});