angular.module('Reddit')
.directive('mbPosts', ['postService','$log',function(postService,$log){
  return {
    templateUrl: './directives/posts/posts.html',
    transclude: true,
    controller: 'PostCtrl'


  }

}]);
