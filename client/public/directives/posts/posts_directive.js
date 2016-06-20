angular.module('Reddit')
.directive('mbPosts', ['postService','$log',function(postService,$log){
  return {
    scope: {
      orderVal: '=',
      searchText: '='
    },
    templateUrl: './directives/posts/posts.html',
    transclude: true,
    controller: 'PostCtrl'


  }

}]);
