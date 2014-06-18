'use strict';

angular.module('NinjahippoCMS').controller('NewPageCtrl', function (api, $scope, Restangular, $filter, Auth, $location, $rootScope, $routeParams) {
  $scope.create_page = function(page) {
    api.getToken().success(function(d,s,h,c){
      Restangular.one('sites', $routeParams.site_slug).post('pages', page, {api_token: d.token}).then(function(){
        $location.path('/dashboard')
      })
    });
  }
});