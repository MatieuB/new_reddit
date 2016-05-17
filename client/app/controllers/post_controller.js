angular.module('Reddit')
  .controller('PostCtrl',['$scope','$log','$http','postService',function($scope,$log,$http,postService) {
      $scope.hello = 'hello in thar?'
      $log.info('from the controller.....')
      $scope.view = {};
      $scope.newPost = {};
      $scope.view.posts =  postService.getPosts();

      // $log.info(scope.view);

      //
      // scope.submitComment = function(post, comment, commentForm) {
      //   var commentCopy = angular.copy(comment);
      //   post.comments.push(commentCopy)
      //   $('#commentModal_'+post.id).modal('hide');
      //   $('.modal-backdrop').remove();
      //   console.log(commentForm);
      //   commentForm.$setUntouched();
      //   commentForm.$setPristine();
      //   console.log(commentForm);
      //   scope.newComment = {};
      // }
      $scope.submitPost = function(post, postForm){

        $scope.newPost.id = postService.getNewId();
        $scope.newPost.showComments = false;
        $scope.newPost.vote = 0;
        $scope.newPost.comments = [];
        var postCopy = angular.copy($scope.newPost);
        // scope.view.posts.push(postCopy);
        postService.addPost(postCopy);
        // $('#postModal').modal('hide');
        // $('.modal-backdrop').remove();
        $scope.newPost = {};
        postService.getPosts()
      }
      // scope.changeVotes = function(post,changeVal) {
      //   postService.changeVotes(post,changeVal)
      //
      // }


    }])
