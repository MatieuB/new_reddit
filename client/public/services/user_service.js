angular.module('Reddit')
.factory('userService', ['$http','$log',function($http,$log) {
  return {
    newUser: function(user) {
      return $http.post('http://localhost:4000/api/users/add',user).then(function(response){
        $log.info('response from post: ',response)
        return response
      })
    },
    login: function(user) {
      return $http.post('http://localhost:4000/api/login',user).then(function(response){
        $log.info('response from login post: ',response)
        return response
      })
    },
    me: function() {
      return $http.get('http://localhost:4000/me').then(function(response){
        $log.info('response from /me route: ',response)
        return response
      })
    }
  }

  }])
