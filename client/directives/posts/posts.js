angular.module('Reddit')
.directive('mbPosts', ['postService','$log', function(postService,$log){
  return {
    scope: {
      orderVal: '=',
      searchText: '='
    },
    templateUrl: '/directives/posts/posts.html',
    link: function(scope,element,attrs) {
      scope.view = {};
      // scope.view.orderVal = scope.orderVal
      // scope.view.searchText = scope.searchText
      scope.view.posts = postService.getPosts();
      $log.info(scope.view);

      // setInterval(function(){
      //   $log.info('from the post', scope.view);
      // }, 2000);


      scope.addPost = function(){
        scope.newPost.showComments = false;
        scope.newPost.vote = 0;
        scope.newPost.id = postService.getNewId();
        posService.addPost(scope.newPost);
        scope.newPost = {};
      }
      scope.changeVotes = function(post,changeVal) {
        postService.changeVotes(post,changeVal)

      }


    }
  }

}]);
