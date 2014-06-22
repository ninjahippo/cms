'use strict';

angular.module('NinjahippoCMS').controller('EditPageCtrl', function (api, $scope, Restangular, $filter, Auth, $location, $rootScope, $routeParams) {
  var api_token;

  api.getToken().success(function(d,s,h,c){
    Restangular.one('sites', $routeParams.site_slug).one('pages', $routeParams.slug).get({api_token: d.token}).then(function(page){
      $scope.page = page;
      $(document).ready(function() {
        $('textarea').wymeditor({
          html: $scope.page.html
        });
      })
    });
    api_token = d.token;
  });

  $('textarea[ng-model="page.html"]').on('change', function(){
    $scope.page.html = $('textarea[ng-model="page.html"]').val();
    $scope.edit_page()
  })

  $scope.edit_page = function() {
    $scope.page.put({api_token: api_token}).then(function(){
      $location.path('/sites/'+$routeParams.site_slug)
    }, function(error) {
      $scope.errors = []
      if (error.data.message.indexOf('duplicate key') > -1) {
        $scope.errors.push('Page name taken for this Site. Please choose a different name.')
      } else {
        $scope.errors.push(error.data.message)
      }
    });
  }
});