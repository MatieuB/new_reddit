angular.module('Reddit')
.controller('PostCtrl',['$scope','$log','$http','postService',function($scope,$log,$http,postService) {
  // $log.info('currentUser: ', currentUser)

  $scope.view = {};
  $scope.newPost = {};
  $scope.post = {}
  $scope.test ="testing......"
  $scope.voteChange = function(){
    $log.info('arrow clicked!')
  }
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


}])
