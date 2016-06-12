angular.module('Reddit').directive('mbComment', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/directives/comments/comments.html',
    controller: 'CommentCtrl'
  }
});
