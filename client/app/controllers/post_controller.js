angular.module('Reddit')
  .controller('PostCtrl',['$scope','$log','postService',function($scope,$log,postService) {
      $scope.view = {};
      $scope.newPost = {};
      postService.all().then(function(response) {
        $scope.view.posts = response.data
      });

      $scope.submitPost = function(post, postForm){
        $scope.newPost.id = postService.getNewId();
        $scope.newPost.showComments = false;
        $scope.newPost.vote = 0;
        $scope.newPost.comments = [];
        var postCopy = angular.copy($scope.newPost);
        postService.addPost(postCopy);
        $('#postModal').modal('hide');
        $('.modal-backdrop').remove();
        $scope.newPost = {};
        postService.getPosts()
      }
      $scope.changeVotes = function(post,changeVal) {
        postService.changeVotes(post,changeVal)
      }
}])
