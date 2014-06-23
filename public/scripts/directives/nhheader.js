angular.module('NinjahippoCMS').directive('nhHeader', function(Auth, $location) {
  return {
    templateUrl: '/views/nh-header.html',
    restrict: 'E',
    link: function($scope, element, attrs) {
      $scope.show_signin_signup = true;

      Auth.login({}).then(function(response) {
        if (response.error) {
          $scope.show_signin_signup = true;
          if (!(['/signup', '/signin'].indexOf(window.location.pathname) > -1)) {
            $location.path('/signin');
          }
        } else {
          $scope.show_signin_signup = false;
          $scope.user = response;
        }
      })
      
      $scope.logout = function() {
        Auth.logout().then(function(){
          $location.path('/');
        }); 
      }
    }
  }
});