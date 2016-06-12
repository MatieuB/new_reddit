angular.module('Reddit')
.controller('CommentCtrl',['$scope','$log','$http','postService',function($scope,$log,$http,postService) {
  $scope.newComment = {}
  $scope.newComment.user_id = function(){
    return Number(localStorage.getItem('user_id'))
  }
  
  $scope.submitComment = function(post){
    if(!localStorage.getItem ('token')){
      alert('Please login to make a comment')
    } else {
      $scope.newComment.post_id = post.id
      var commentCopy = angular.copy($scope.newComment)
      postService.newComment(commentCopy).then(function(response){
        $log.info(response)
      })
    }
  }
  $scope.toggleComments = function(post) {
    $log.info('post: ',post)
    $log.info('showComments========== ',post.showComments)
    return post.showComments = !post.showComments
  }


}])
