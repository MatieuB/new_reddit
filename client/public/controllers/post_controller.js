angular.module('Reddit')
.controller('PostCtrl',['$scope','$log','$http','$rootScope','postService',function($scope,$log,$http,$rootScope,postService) {

  postService.all().then(function(response) {
    $rootScope.view.posts = response.data;
  });
  $rootScope.user = {}
  $rootScope.view ={}
  // $rootScope.view.posts =[]
  postService.getUser()
  // $rootScope.user = {}

  
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

  $scope.newPost.showComments = false;
  $scope.newPost.votes = 0;
  $scope.newPost.user_id = Number(localStorage.getItem('user_id'));
  $scope.newPost.favorite = false;
  $scope.submitPost = function(){
    if(!localStorage.getItem('token')){
      alert('Please login to make a post')
    } else {
      $rootScope.view.posts.push($scope.newPost)
      // var postCopy = angular.copy($scope.newPost)
      // $log.info('post: ',postCopy)
      // $rootScope.view.posts.push(postCopy)
      postService.newPost($scope.newPost).then(function(response){
        $log.info('response from new post: ',response)
        $scope.newPost = {}
      })
    }
  }
  $scope.view.posts
  $log.info('$rootScope.view.posts',$rootScope.view.posts)
  $scope.deletePost = function(post){
    $log.info('delete was clicked!!')
    let index = $rootScope.view.posts.indexOf(post);
    $rootScope.view.posts.splice(index, 1);
    $log.info('was it deleted?',$rootScope.view.posts);
    postService.deletePost(post.id).then(function(deleteData){


    })
  }


}])
