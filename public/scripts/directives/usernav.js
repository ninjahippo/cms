angular.module('NinjahippoCMS').directive('userNav', function(Auth, $location) {
  return {
    templateUrl: '/views/user-nav.html',
    restrict: 'E',
    link: function($scope, element, attrs) {
      Auth.currentUser().then(function(user) {
        $scope.user = user;
      })

      $scope.logout = function() {
        Auth.logout().then(function(){
          $location.path('/');
        }); 
      }

      $scope.showBack = function() {
        return window.location.pathname !== '/dashboard';
      }
    }
  }
});