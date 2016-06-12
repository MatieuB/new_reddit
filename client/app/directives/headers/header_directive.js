(function() {
  'use strict';

}());
angular.module('Reddit')
.directive('mbHeader',['userService','localStorageService',function(userService,localStorageService){
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: '/directives/headers/header.html',
    controller: function($scope,$log,$http,$window) {
      if(localStorage.getItem('token')){
        $scope.signedIn = true
      } else {
        $scope.signedIn = false;
      }
      $scope.signUp = function(){
        $log.info($scope.userForm);
        userService.newUser($scope.userForm).then(function(response) {
          $log.info('response from dir controller: ',response)
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('username',response.data.username)
          $scope.userName = localStorage.getItem('username')
          $scope.signedIn = true;

        })
      }
      $scope.logIn = function() {
        userService.login($scope.loginForm).then(function(response) {
          $log.info('response from login: ',response)
          if(response.data.token){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('username',response.data.username)
            $scope.userName = localStorage.getItem('username')
            $scope.signedIn = true;
          } else {
            $scope.message = 'Invalid email or password'
          }
        })
      }
      $scope.logOut = function(){
        localStorage.clear()
        $scope.signedIn = false;
      }
      $log.info('signedIn: ',$scope.signedIn)

    }



    // scope: {
    //   orderVal: '=',
    //   searchText: '='
    // },

    // link: function (scope,  element, attrs ) {
    //     scope.view = {}
    //     // scope.view.orderVal = scope.orderVal
    //     // scope.view.searchText = scope.searchText
    //     // console.log(scope.view);
    //
    //     scope.logOrderVal = function(){
    //       console.log(scope.view);
    //     }
    //
    //     scope.setOrderVal = function(newVal) {
    //       scope.view.currentSort = newVal;
    //       scope.view.orderVal = newVal === "title" ? newVal : '-' + newVal
    //     }
    //
    //   }
  }


}])
