angular.module('Reddit')
.controller('CommentCtrl',['$scope','$log','$http','postService',function($scope,$log,$http,postService) {
  $scope.newComment = {}
  $scope.newComment.user_id = Number(localStorage.getItem('user_id'))

  $scope.submitComment = function(post){
    if(!localStorage.getItem ('token')){
      alert('Please login to make a comment')
    } else {
      $scope.newComment.post_id = this.post.id
      var commentCopy = angular.copy($scope.newComment)
      postService.newComment(commentCopy).then(function(response){
        $log.info(response)
      }).then(function(){
        postService.all().then(function(response) {
          $scope.view.posts = response.data
          $scope.newComment = {}
        })
      })
    }
  }
  $scope.toggleComments = function(post) {
    $log.info('post: ',this.post)
    $log.info('showComments========== ',this.post.showComments)
    return this.post.showComments = !this.post.showComments
  }


}])
