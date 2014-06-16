'use strict';

angular.module('NinjahippoCMS').controller('NewSiteCtrl', function ($scope, Restangular, $filter, Auth, $location, $rootScope) {
  $scope.create_site = function(site) {
    Restangular.post('sites', site).then(function(){
      $location.path('/dashboard')
    })
  }
});