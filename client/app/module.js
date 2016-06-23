(function() {
  'use strict';


  angular.module('Reddit',['ngAnimate','ui.router','LocalStorageModule'])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
      url: '/',
      template: '<mb-posts></mb-post>',
      resolve: {
        currentUser: function($http,$log,$state,$rootScope) {
          var apiUrl = $rootScope.apiUrl
          if(localStorage.getItem('token')) {
            $log.info('checking for token....')
            const config = {
              headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
              }
            }
            return $http.get(apiUrl+'api/users/me',config)
            .then(function(response) {
              $log.info('from the resolve:',response)
              $log.info(response.data)
              return response.data
              // $state.go('tab.home')
            })
            .catch(function (err) {
              $log.info('there was an error: ',err)
              localStorage.clear();
              $scope.signedIn = false;
              $state.go('home')
              // return null;
            })
          }
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
