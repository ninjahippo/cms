angular.module('NinjahippoCMS').directive('nhHeader', function(Auth, $location) {
  return {
    templateUrl: '/views/nh-header.html',
    restrict: 'E',
    link: function($scope, element, attrs) {
      if (!Auth.isAuthenticated()) {
        $scope.show_signin_signup = true;
        if (!(['/signup', '/signin'].indexOf(window.location.pathname) > -1)) {
          $location.path('/signin');
        }
      } else {
        $scope.show_signin_signup = false;
        Auth.currentUser().then(function(user) {
          $scope.user = user;
        })
        if ((['/signup', '/signin'].indexOf(window.location.pathname) > -1)) {
          $location.path('/dashboard');
        }
      }
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