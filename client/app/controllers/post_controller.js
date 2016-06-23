angular.module('Reddit')
.controller('PostCtrl',['$scope','$log','$http','postService',function($scope,$log,$http,postService) {
  var apiUrl = $rootScope.apiUrl
  // $log.info('currentUser: ', currentUser)
  $scope.voteChange = function() {
    $log.info('vote thing clicked');
    alert('connected!');
    // postService.changeVotes().then(function(results){
    //   $log.info('vote results', results)
    // })
  };
  $scope.test = 'testing==========';
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
      $http.post($rootScope.apiUrl+'api/posts/add',$scope.newPost).then(function(response){
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
