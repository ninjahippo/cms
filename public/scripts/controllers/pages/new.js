'use strict';

angular.module('NinjahippoCMS').controller('NewPageCtrl', function (api, $scope, Restangular, $filter, Auth, $location, $rootScope, $routeParams) {
  $('textarea').wymeditor()

  $('textarea[ng-model="page.html"]').on('change', function(){
    $scope.page.html = $('textarea[ng-model="page.html"]').val();
    $scope.create_page($scope.page)
  })

  $scope.create_page = function(page) {
    api.getToken().success(function(d,s,h,c){
      Restangular.one('sites', $routeParams.site_slug).post('pages', page, {api_token: d.token}).then(function(){
        $location.path('/sites/'+$routeParams.site_slug)
      }, function(error) {
        $scope.errors = []
        if (error.data.message.indexOf('duplicate key') > -1) {
          $scope.errors.push('Page name taken for this Site. Please choose a different name.')
        } else {
          $scope.errors.push(error.data.message)
        }
      })
    });
  }
});