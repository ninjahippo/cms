'use strict';

angular.module('NinjahippoCMS').controller('ShowSiteCtrl', function (api, $scope, Restangular, $filter, Auth, $location, $rootScope, $routeParams) {
  api.getToken().success(function(d,s,h,c){
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
    });
  });
});