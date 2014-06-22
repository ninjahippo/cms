'use strict';

angular.module('NinjahippoCMS').controller('NewSiteCtrl', function (api, $scope, Restangular, $filter, Auth, $location, $rootScope) {
  $scope.create_site = function(site) {
    api.getToken().success(function(d,s,h,c){
      Restangular.all('sites').post(site, {api_token: d.token}).then(function(site){
        $location.path('/sites/'+site.slug);
      }, function(error) {
        $scope.errors = []
        if (error.data.message.indexOf('duplicate key') > -1) {
          $scope.errors.push('Site name taken. Please choose a different name.')
        } else {
          $scope.errors.push(error.data.message)
        }
      })
    });
  }
});