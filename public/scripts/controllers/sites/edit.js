'use strict';

angular.module('NinjahippoCMS').controller('EditSiteCtrl', function ($scope, Restangular, $filter, Auth, $location, $rootScope, $routeParams) {
  Restangular.one('sites', $routeParams.slug).get().then(function(site){
    $scope.site = site;
  });

  $scope.edit_site = function(site) {
    Restangular.one('sites', $routeParams.slug).customPUT($scope.site).then(function(){
      $location.path('/dashboard')
    });
  }
});