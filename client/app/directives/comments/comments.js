angular.module('Reddit').directive('mbComment', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/directives/comments/comments.html',
        link: function(scope, element, attrs, fn) {
            scope.comments = scope.post.comments;
            scope.view = {};

            scope.submitComment = function(post, comment, commentForm) {
              var commentCopy = angular.copy(comment);
              post.comments.push(commentCopy)
              $('#commentModal_'+post.id).modal('hide');
              $('.modal-backdrop').remove();
              console.log(commentForm);
              commentForm.$setUntouched();
              commentForm.$setPristine();
              console.log(commentForm);
              scope.newComment = {};
            }
            scope.toggleComments = function(post) {
              this.post.showComments = !this.post.showComments;
              console.log('post.showCommments===',this.post.showComments)
            }
        }
    }
});
