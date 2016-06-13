angular.module('Reddit')
.controller('PostCtrl',['$scope','$log','$http','postService',function($scope,$log,$http,postService) {

    // $http.get('http://localhost:4000/api/users/me')
    //   .then(function (response) {
    //     $log.info('from resolve',response.data)
    //     if(response.data.error) {
    //       localStorage.clear();
    //       // $location.path('/login')
    //       return {message: 'need to login'}
    //     }
    //     return response.data
    //   })

  // postService.getMe().then(function(response){
  //   $log.info('me route post controller', response)
  // })
  $scope.view = {};
  $scope.newPost = {};
  $scope.post = {}
  postService.all().then(function(response) {
    $scope.view.posts = response.data;
  });


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
  // $scope.newComment = {}
  // $scope.newComment.user_id = function(){
  //   return Number(localStorage.getItem('user_id'))
  // }
  //
  // $scope.submitComment = function(post){
  //   if(!localStorage.getItem ('token')){
  //     alert('Please login to make a comment')
  //   } else {
  //     $scope.newComment.post_id = post.id
  //     var commentCopy = angular.copy($scope.newComment)
  //     postService.newComment(commentCopy).then(function(response){
  //       $log.info(response)
  //     })
  //   }
  // }
  // $scope.toggleComments = function(post) {
  //   $log.info('post: ',post)
  //   $log.info('showComments========== ',post.showComments)
  //   return post.showComments = !post.showComments
  // }

}])
