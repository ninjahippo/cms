angular.module('NinjahippoCMS').factory('errorInterceptor', ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {
  return {
    request: function (config) {
      return config || $q.when(config);
    },
    requestError: function(request){
      return $q.when(request);
    },
    response: function (response) {
      return $q.when(response);
    },
    responseError: function (response) {
      if (response.status == 401) {
        return $q.when(response);
      } else {
        return $q.reject(response);
      }
    }
  };
}]);