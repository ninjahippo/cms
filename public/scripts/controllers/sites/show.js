'use strict';

angular.module('NinjahippoCMS').controller('ShowSiteCtrl', function ($scope, Restangular, $filter, Auth, $location, $rootScope, $routeParams) {
  Restangular.one('sites', $routeParams.slug).get().then(function(site){
    $scope.site = site;
  });
});