angular.module('NinjahippoCMS').factory('authInterceptor', function httpInterceptor ($q, $window, $location) {
  return function (p) {
      return p.then(function (r) {
          return r;
      }, function (r) {
          if (r.status === 401) {
              $location.url('/signin');
          }

          return $q.reject(r);
      });
  };
});