angular.module('Reddit')
.factory('postService', ['$http','$rootScope','$log',function ($http,$rootScope,$log) {

  $rootScope.apiUrl = "https://mbredclone.herokuapp.com/" || "http://localhost:4000/"
  return {


    all: function() {
      return $http.get( $rootScope.apiUrl + 'api/posts').then(function(response){
        $log.info(response)
        return response
      });
    },
    newPost: function(newPost) {
      return $http.post($rootScope.apiUrl+'api/posts/add',newPost).then(function(response){
        log.info(response)
        return response
      })
    },
    getMe: function(){
      $http.get($rootScope.apiUrl + 'api/users/me')
      .then(function (response) {
        $log.info('from resolve',response.data)
        if(response.data.error) {
          localStorage.clear();
          // $location.path('/login')
          return {message: 'need to login'}
        }
        return response.data
      })
    },
    getUser: function(){
      $rootScope.user = {}
      if(!localStorage.getItem('username')){
        $rootScope.user = {};
      }
      $rootScope.user.name = localStorage.getItem('username')
      $rootScope.user.id = localStorage.getItem('user_id')
      $log.info('user',$rootScope.user)
      return $rootScope.user
    },

    deletePost: function(id) {
      return $http.delete($rootScope.apiUrl+'api/delete/'+id)
    },
    editPost: function(post) {
      return $http.put($rootScope.apiUrl+'api/edit/post/'+post.id,post)
    },
    getPost: function(id) {
      return $http.get($rootScope.apiUrl+'api/post/'+ id)
    },
    newComment: function(newComment) {
      return $http.post($rootScope.apiUrl+'api/comments/add',newComment).then(function(response){
        $log.info('response form commentpost: ', response)
        return response
      })
    },
    changeVotes: function(id){
      return $http.post($rootScope.apiUrl+'api/votes',id).then(function(response){
        $log.info(response);
        return response;
      })
    }

  }
}])
