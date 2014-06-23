'use strict';

angular.module('NinjahippoCMS').controller('DashboardCtrl', function (api, $scope, Restangular, $filter, Auth, $location, $rootScope) {
  api.getToken().success(function(d,s,h,c){
    $scope.token = d.token;
    Restangular.all('sites').getList({api_token: d.token}).then(function(sites) {
      $scope.sites = sites;
      for (var i = 0; i < $scope.sites.length; i++) {
        var site = $scope.sites[i];
        site.shown_slug = site.slug;
        if (site.title.length > 21) {
          site.title = site.title.substr(0, 18) + '...';
        }
        if (site.slug.length > 21) {
          site.shown_slug = site.slug.substr(0,18) + '...';
        }
      }
    });
  });

  $scope.delete_site = function(site, $event) {
    $event.preventDefault();
    if (confirm("Are you sure you want to delete this site?")) {
      site.remove({slug: site.slug, api_token: $scope.token}).then(function(res) {
        $scope.sites = _.without($scope.sites, site);
      })
    }
  }
});