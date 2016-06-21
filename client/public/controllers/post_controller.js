angular.module('Reddit')
.controller('PostCtrl',['$scope','$log','$http','$rootScope','postService',function($scope,$log,$http,$rootScope,postService) {
$rootScope.user = {}
  postService.getUser()
  // $rootScope.user = {}

$rootScope.user.thing = "shutup"
    $rootScope.user.name = localStorage.getItem('username');
    $rootScope.user.id = localStorage.getItem('user_id')



  $log.info('from controller:',$rootScope.user)
  $log.info('from controller:',$rootScope.user.name)
  $log.info('from controller:',$rootScope.user.id)



  $scope.view = {};
  $scope.newPost = {};
  $scope.post = {}
  $scope.test ="testing......"
  $scope.changeVotes = function(post,changeVal){
    post.votes +=changeVal;
  }
  $scope.voteChange = function(post){
    // $log.info('arrow clicked!');
    // post.votes +=changeVal
    $log.info('post:::::',post)
    postService.changeVotes(post).then(function(data){
      $log.info('data from votechange pstctrl: ',data)
    })
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
