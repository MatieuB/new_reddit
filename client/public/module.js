(function() {
  'use strict';


  angular.module('Reddit',['ngAnimate','ui.router','LocalStorageModule'])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
      url: '/',
      template: '<mb-posts></mb-post>'

    })
    .state('edit',{
      url:'/edit/:id',
      templateUrl: '/directives/posts/edit_post.html',
      controller: function($scope,$log,$rootScope,$state,$http,$stateParams,postService){
        postService.getPost($stateParams.id).then(function(data){
          $rootScope.post = data.data[0]
          $log.info('RSP',$rootScope.post);
        });

        $scope.submitEdit = function(){
          $rootScope.view.posts[Number($rootScope.post.id)-1] = $rootScope.post
          $http.put('http://localhost:4000/api/edit/post/'+$rootScope.post.id,$rootScope.post).then(function(data){
            $log.info('data from edit:',data)
            postService.all().then(function(response){
              $rootScope.view.post = response.data
            })
            $state.go('home')
          })
        }
      }
    })

    // $stateProvider.html5Mode(true);
  });
  angular.module('Reddit').factory('authInterceptor', function () {
    return {
      request: function(config) {
        if (localStorage.getItem('token')) {
          config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        }
        return config;
      },
      responseError: function(response) {
        console.log('from the interceptor: ',response);
        return response;
      }
    };
  })
}());
