angular.module('Reddit')
.controller('PostCtrl',['$scope','$log','$http','postService',function($scope,$log,$http,postService) {
  $scope.view = {};
  $scope.newPost = {};
  $scope.post = {}
  postService.all().then(function(response) {
    $scope.view.posts = response.data;
  });
  // $log.info('$scope.view.posts: ',$scope.view.posts)

  $scope.newPost.showComments = false;
  $scope.newPost.votes = 0;
  $scope.newPost.user_id = Number(localStorage.getItem('user_id'));
  $scope.newPost.favorite = false;
  $scope.submitPost = function(){
    if(!localStorage.getItem('token')){
      alert('Please login to make a post')
    } else {
      var postCopy = angular.copy($scope.newPost)
      $log.info('post: ',postCopy)
      $http.post('http://localhost:4000/api/posts/add',postCopy).then(function(response){
        $log.info('response from new post: ',response)
      }).then(function(){
        postService.all().then(function(response) {
          $scope.view.posts = response.data
          $scope.newPost = {};
        })
      });
    }
  }
  $scope.newComment = {}
  $scope.newComment.user_id = Number(localStorage.getItem('user_id'));
  // $scope.newComment.post_id = post.id

  $scope.submitComment = function(){
    if(!localStorage.getItem ('token')){
      alert('Please login to make a comment')
    } else {
      var commentCopy = angular.copy($scope.newComment)
      postService.newComment(commentCopy).then(function(response){
        $log.info(response)
      })
    }
  }
  $scope.toggleComments = function() {
    $scope.post.showComments = !$scope.post.showComments
    $log.info('showComments: ', $scope.post.showComments)
  }
  $log.info('$scope.post: ',$scope.post)
}])
