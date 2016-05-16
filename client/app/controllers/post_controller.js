angular.module('Reddit')
  .controller('PostCtrl',['$scope','$log','$http','postService',function($scope,$log,$http,postService) {
      $scope.hello = 'hello in thar?'
      $log.info('from the directive..controller.....')
      $scope.view = {};
      $scope.newPost = {};
      $scope.view.posts = [
        {
          id: 1,
          title:'test post',
          author:'matthew',
          message:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', image:'http://static.wixstatic.com/media/9759b2_6c06b978af9044fc8c8642acaabe8d4e.jpg_srz_978_643_85_22_0.50_1.20_0.00_jpg_srz',
          vote: 0,
          comments: [],
          showComments: false
        },
        {
          id: 2,
          title:'test 2 post',
          author:'matthew bouchard',
          message:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', image:'http://resources1.news.com.au/images/2007/08/16/va1237262195811/KermitMississippi-Development-Authority-5613248.jpg',
          vote: -4,
          comments: [
            {
              id: 1,
              author: 'mister mataytoe',
              myComment: 'you will understand soon'
            },
            {
              id: 2,
              author: 'bananaman',
              myComment: 'not if I see you first'
            }
          ],
          showComments: false
        },
        {
          id: 3,
          title:'post master man',
          author:'Ansel Angleton',
          message:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', image:'http://media.cleveland.com/parents/photo/9853524-large.jpg',
          vote: 5,
          comments: [
            {
              id: 1,
              author: 'mataytoe',
              myComment: 'you will understand soon'
            },
            {
              id: 2,
              author: 'bananaman brah',
              myComment: 'not if I see you first'
            }
          ],
          showComments: false
        }
      ];
      // postService.getPosts();
      // $log.info(scope.view);

      // setInterval(function(){
      //   $log.info('from the post', scope.view);
      // }, 2000);
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
      // scope.submitPost = function(post, postForm){
      //
      //   scope.newPost.id = postService.getNewId();
      //   scope.newPost.showComments = false;
      //   scope.newPost.vote = 0;
      //   scope.newPost.comments = [];
      //   var postCopy = angular.copy(scope.newPost);
      //   // scope.view.posts.push(postCopy);
      //   postService.addPost(postCopy);
      //   // $('#postModal').modal('hide');
      //   // $('.modal-backdrop').remove();
      //   scope.newPost = {};
      // }
      // scope.changeVotes = function(post,changeVal) {
      //   postService.changeVotes(post,changeVal)
      //
      // }


    }])
