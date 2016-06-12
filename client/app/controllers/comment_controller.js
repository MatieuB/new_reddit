angular.module('Reddit')
.controller('CommentCtrl',['$scope','$log','$http','postService',function($scope,$log,$http,postService) {
  $scope.newComment = {}
  $scope.newComment.user_id = Number(localStorage.getItem('user_id'));
  // $scope.newComment.post_id = post.id

  $scope.submitComment = function(){
    if(!localStorage.getItem ('token')){
      alert('Please login to make a comment')
    }
    var commentCopy = angular.copy($scope.newComment)
    postService.newComment(commentCopy).then(function(response){
      $log.info(response)
    })
  }
  $scope.toggleComments = function() {
    post.showComments = !post.showComments
    $log.info('showComments: ', post.showComments)
  }


}])
