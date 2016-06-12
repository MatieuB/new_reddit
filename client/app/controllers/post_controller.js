angular.module('Reddit')
.controller('PostCtrl',['$scope','$log','$http','postService',function($scope,$log,$http,postService) {
  $scope.view = {};
  $scope.newPost = {};
  postService.all().then(function(response) {
    $scope.view.posts = response.data;
  });
  $scope.newPost.showComments = false;
  $scope.newPost.votes = 0;
  $scope.newPost.user_id = Number(localStorage.getItem('user_id'));
  $scope.newPost.favorite = false;
  $scope.submitPost = function(){

    var postCopy = angular.copy($scope.newPost)
    $log.info('post: ',postCopy)
    $http.post('http://localhost:4000/api/posts/add',postCopy).then(function(response){
      $log.info('response from new post: ',response)
    }).then(function(){
      postService.all().then(function(response) {
        $scope.view.posts = response.data
      })
    });

  }

  // $scope.submitPost = function(post, postForm){
  //   $scope.newPost.id = postService.getNewId();
  //   $scope.newPost.showComments = false;
  //   $scope.newPost.vote = 0;
  //   $scope.newPost.comments = [];
  //   var postCopy = angular.copy($scope.newPost);
  //   postService.addPost(postCopy);
  //   $('#postModal').modal('hide');
  //   $('.modal-backdrop').remove();
  //   $scope.newPost = {};
  //   postService.getPosts()
  // }
  // $scope.changeVotes = function(post,changeVal) {
  //   postService.changeVotes(post,changeVal)
  // }
}])
