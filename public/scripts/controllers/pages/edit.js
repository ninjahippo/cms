'use strict';

angular.module('NinjahippoCMS').controller('EditPageCtrl', function (api, $scope, Restangular, $filter, Auth, $location, $rootScope, $routeParams) {
  var api_token;
  api.getToken().success(function(d,s,h,c){
    Restangular.one('sites', $routeParams.site_slug).one('pages', $routeParams.slug).get({api_token: d.token}).then(function(page){
      $scope.page = page;
    })
    api_token = d.token;
  });

  $scope.edit_page = function(page) {
   $scope.page.put({api_token: api_token}).then(function(){
      $location.path('/dashboard')
    })
  }
});