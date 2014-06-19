angular.module('NinjahippoCMS').directive('nhFooter', function(Auth, $location) {
  return {
    templateUrl: '/views/nh-footer.html',
    restrict: 'E'
  }
});