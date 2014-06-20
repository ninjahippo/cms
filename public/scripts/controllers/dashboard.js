'use strict';

angular.module('NinjahippoCMS').controller('DashboardCtrl', function (api, $scope, Restangular, $filter, Auth, $location, $rootScope) {
  api.getToken().success(function(d,s,h,c){
    $scope.token = d.token;
    Restangular.all('sites').getList({api_token: d.token}).then(function(sites) {
      $scope.sites = sites;
      for (var i = 0; i < $scope.sites.length; i++) {
        $scope.sites[i].pages = [];
        Restangular.one('sites', $scope.sites[i].slug).getList('pages', {api_token: d.token}).then(function(pages){
          for (var i = 0; i < pages.length; i++) {
            $scope.sites[i].pages.push(pages[i])
          }
        });
      }
    });
  });
  
  $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
    $location.path('/signin');
  });
});