(function() {
  'use strict';


  angular.module('Reddit',['ngAnimate','ui.router','LocalStorageModule'])
  .config(function($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('/');

    $stateProvider

    // HOME StAtES AND NEStED VIEWS ========================================
    .state('home', {
      url: '/',
      template: '<mb-posts></mb-post>',
      filters:'<mb-header></mb-header>'
    })
    .state('edit',{
      url:'/edit/:id',
      templateUrl: '/directives/posts/edit_post.html',
      protected:true,
      resolve: {
        currentUser: function($http,$log,$state) {
          if(localStorage.getItem('token')) {
            $log.info('checking for token....')
            const config = {
              headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
              }
            }
            console.log('config:'config);
            return $http.get('https://mbredclone.herokuapp.com/api/users/me',config)
            .then(function(response) {
              $log.info('from the resolve:',response)
              $log.info(response.data)
              return response.data
              $state.go('home')
            })
            .catch(function () {
              $log.info('there was an error')
              localStorage.clear();
              $state.go('home')
              return null;
            })
          }
        }
      },
      controller: function($scope,$log,$rootScope,$state,$http,$stateParams,postService,currentUser){
        postService.getPost($stateParams.id).then(function(data){
          $rootScope.post = data.data[0]
          $log.info('RSP',$rootScope.post);
          if(currentUser.id != $rootScope.post.user_id){
            $log.info('rejected')
            $state.go('home')
          }
        });
        $rootScope.apiUrl = 'https://mbredclone.herokuapp.com/'|| "http://localhost:4000/"

        $rootScope.user = {}
        $rootScope.user.name = localStorage.getItem('username');
        $rootScope.user.id = localStorage.getItem('user_id')
        $log.info('currentUser:',currentUser)
        $scope.submitEdit = function(){
          $rootScope.view.posts[Number($rootScope.post.id)-1] = $rootScope.post
          $http.put($rootScope.apiUrl+'api/edit/post/'+$rootScope.post.id,$rootScope.post).then(function(data){
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
  // app.run runs once when the app starts
  // this improves user experience
  angular.module('Reddit').run(function ($rootScope,$window, $log,$state) {
    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options){
      // event.preventDefault();
      if(toState.protected && !$rootScope.user.id ) {
        console.log("requires login dude!!!");
        // const LoginError = "Please Login!"
        $state.go('home')
      }
    })
  });
}());
