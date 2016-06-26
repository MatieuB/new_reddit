angular.module('Reddit')
.factory('userService', ['$http','$log','$rootScope',function($http,$log,$rootScope) {

  return {
    newUser: function(user) {
      return $http.post('/api/users/add',user).then(function(response){
        $log.info('response from post: ',response)
        return response
      })
    },
    login: function(user) {
      return $http.post('/api/login',user).then(function(response){
        $log.info('response from login post: ',response)
        return response
      })
    },
    me: function() {
      return $http.get('/me').then(function(response){
        $log.info('response from /me route: ',response)
        return response
      })
    }
  }

}])
