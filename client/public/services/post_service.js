angular.module('Reddit')
.factory('postService', ['$http','$rootScope','$log',function ($http,$rootScope,$log) {
  return {
    all: function() {
      return $http.get('http://localhost:4000/api/posts').then(function(response){
        $log.info(response)
        return response
      });
    },
    newPost: function(newPost) {
      return $http.post('http://localhost:4000/api/posts/add',newPost).then(function(response){
        log.info(response)
        return response
      })
    },
    getMe: function(){
      $http.get('http://localhost:4000/api/users/me')
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
      $rootScope.user.name = localStorage.getItem('username')
      $rootScope.user.id = localStorage.getItem('user_id')
      $log.info('user',$rootScope.user)
      return $rootScope.user
      // if(localStorage.getItem('toke  n')) {
      //   $log.info('checking for token....')
      //   const config = {
      //     headers: {
      //       authorization: 'Bearer ' + localStorage.getItem('token')
      //     }
      //   }
      //   return $http.get('http://localhost:4000/api/users/me',config)
      //   .then(function(response) {
      //     $log.info('from the resolve:',response)
      //     $log.info(response.data)
      //     return response.data
      //     // $state.go('tab.home')
      //   })
      //   .catch(function (err) {
      //     $log.info('there was an error: ',err)
      //     localStorage.clear();
      //     $scope.signedIn = false;
      //     $state.go('home')
      //      return null;
      //   })
      // }
    },

    deletePost: function(id) {
      return $http.delete('/api/post/' + id)
    },
    editPost: function(pirate) {
      return $http.put('/api/edit/post/' +pirate.id , post)
    },
    getPost: function(id) {
      return $http.get('/api/post/'+ id)
    },
    newComment: function(newComment) {
      return $http.post('http://localhost:4000/api/comments/add',newComment).then(function(response){
        $log.info('response form commentpost: ', response)
        return response
      })
    },
    changeVotes: function(id){
      return $http.post('http://localhost:4000/api/votes',id).then(function(response){
        $log.info(response);
        return response;
      })
    }
  }
}])
