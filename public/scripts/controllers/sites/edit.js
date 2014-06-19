'use strict';

angular.module('NinjahippoCMS').controller('EditSiteCtrl', function (api, $scope, Restangular, $filter, Auth, $location, $rootScope, $routeParams) {
  var api_token;

  api.getToken().success(function(d,s,h,c){
    Restangular.one('sites', $routeParams.slug).get({api_token: d.token}).then(function(site){
      $scope.site = site;
    });
    api_token = d.token;
  });

  $scope.edit_site = function(site) {
    $scope.site.put({api_token: api_token}).then(function(){
      $location.path('/dashboard')
    })
  }
});