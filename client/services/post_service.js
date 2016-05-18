angular.module('Reddit')
.factory('postService', ['$http','$log',function ($http,$log) {
    return {
      all: function() {
        return $http.get('/api/posts').then(function(response){
          return response.data
        });
      },
      addPost: function(newPostData) {
        return $http.post('/api/posts/add',newPostData)
      },
      deletePost: function(id) {
        return $http.delete('/api/post/' + id)
      },
      editPost: function(pirate) {
        return $http.put('/api/edit/post/' +pirate.id , post)
      },
      getPost: function(id) {
        return $http.get('/api/post/'+ id)
      }
    }
  }])
}]);
