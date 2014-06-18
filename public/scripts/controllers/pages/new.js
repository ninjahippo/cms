'use strict';

angular.module('NinjahippoCMS').controller('NewPageCtrl', function ($scope, Restangular, $filter, Auth, $location, $rootScope, $routeParams) {
  $scope.create_page = function(page) {
    Restangular.one('sites', $routeParams.site_slug).post('pages', page, {api_token: $rootScope.api_token}).then(function(){
      $location.path('/dashboard')
    })
  }
});