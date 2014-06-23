'use strict';

angular.module('NinjahippoCMS').controller('ShowSiteCtrl', function (api, $scope, Restangular, $filter, Auth, $location, $rootScope, $routeParams) {
  api.getToken().success(function(d,s,h,c){
    $scope.api_token = d.token;
    Restangular.one('sites', $routeParams.slug).get({api_token: d.token}).then(function(site){
      $scope.site = site;
      Restangular.one('sites', $routeParams.slug).getList('pages', {api_token: d.token}).then(function(pages){
        $scope.site.pages = pages;

        for (var i = 0; i < $scope.site.pages.length; i++) {
          var page = $scope.site.pages[i];
          page.shown_slug = page.slug;
          if (page.title.length > 21) {
            page.title = page.title.substr(0, 18) + '...';
          }
          if (page.slug.length > 21) {
            page.shown_slug = page.slug.substr(0,18) + '...';
          }
        }
      })
    }, function(err) {
      $location.path('/dashboard')
    });
  });

  $scope.delete_site = function() {
    if (confirm("Are you sure you want to delete this site?")) {
      $scope.site.remove({slug: $routeParams.slug, api_token: $scope.api_token}).then(function(res) {
        $location.path('/dashboard')
      })
    }
  }

  $scope.delete_page = function(page, $event) {
    $event.preventDefault();
    if (confirm("Are you sure you want to delete this page?")) {
      page.remove({slug: page.slug, api_token: $scope.api_token}).then(function(res) {
        $scope.site.pages = _.without($scope.site.pages, page)
      })
    }
  }
});