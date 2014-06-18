'use strict';

angular.module('NinjahippoCMS').controller('DashboardCtrl', function ($scope, Restangular, $filter, Auth, $location, $rootScope) {
  Restangular.all('sites').getList({api_token: $rootScope.api_token}).then(function(sites) {
    $scope.sites = sites;
  });

  $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
    $location.path('/signin');
  });
});