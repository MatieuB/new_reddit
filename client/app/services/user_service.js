angular.module('Reddit')
.factory('userService', ['$http','$log',function ($http,$log) {
  return {
    newUser: function() {
      return $http.post('http//:localhost:4000/users/add').then(function(response){
        $log.info('response from post: ',response)
        return response
      })
    },
    login: function() {
      return $http.post('http//:localhost:4000/login').then(function(response){
        $log.info('response from login post: ',response)
        return response
      })
    }
    me: function() {
      return $http.get('http//:localhost:4000/me').then(function(response){
        $log.info('response from /me route: ',response)
        return response
      })
    }

  }])
