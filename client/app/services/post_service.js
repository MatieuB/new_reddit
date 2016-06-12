
angular.module('Reddit')
.factory('postService', ['$http','$log',function ($http,$log) {
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
      deletePost: function(id) {
        return $http.delete('/api/post/' + id)
      },
      editPost: function(pirate) {
        return $http.put('/api/edit/post/' +pirate.id , post)
      },
      getPost: function(id) {
        return $http.get('/api/post/'+ id)
      },
      changeVotes: function(id){
        return $http.post('http://localhost:4000/api/votes').then(function(response){
          $log.info(response);
          return response;
        })
      }
    }
  }])
