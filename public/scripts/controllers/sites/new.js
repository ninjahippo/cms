'use strict';

angular.module('NinjahippoCMS').controller('NewSiteCtrl', function ($scope, Restangular, $filter, Auth, $location, $rootScope) {
  $scope.create_site = function(site) {
    Restangular.all('sites').post(site, {api_token: $rootScope.api_token}).then(function(){
      $location.path('/dashboard')
    })
  }
});