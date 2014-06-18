'use strict';

angular.module('NinjahippoCMS').controller('NewSiteCtrl', function (api, $scope, Restangular, $filter, Auth, $location, $rootScope) {
  $scope.create_site = function(site) {
    api.getToken().success(function(d,s,h,c){
      Restangular.all('sites').post(site, {api_token: d.token}).then(function(){
        $location.path('/dashboard')
      })
    });
  }
});