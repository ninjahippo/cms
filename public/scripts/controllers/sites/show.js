'use strict';

angular.module('NinjahippoCMS').controller('ShowSiteCtrl', function (api, $scope, Restangular, $filter, Auth, $location, $rootScope, $routeParams) {
  api.getToken().success(function(d,s,h,c){
    Restangular.one('sites', $routeParams.slug).get({api_token: d.token}).then(function(site){
      $scope.site = site;
      Restangular.one('sites', $routeParams.slug).getList('pages', {api_token: d.token}).then(function(pages){
        $scope.site.pages = pages;
      })
    });
  });
});