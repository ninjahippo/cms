'use strict';

angular.module('NinjahippoCMS').controller('EditPageCtrl', function ($scope, Restangular, $filter, Auth, $location, $rootScope, $routeParams) {
  Restangular.one('sites', $routeParams.site_slug).one('pages', $routeParams.slug).get().then(function(page){
    $scope.page = page;
  })

  $scope.edit_page = function(page) {
    Restangular.one('sites', $routeParams.site_slug).one('pages', $routeParams.slug).customPUT($scope.page).then(function(){
      $location.path('/dashboard')
    })
  }
});