angular.module('Reddit')
  .directive('mbHeader',['userService',function(userService){
  return {
        restrict: 'EA',
        replace: true,
        templateUrl: '/directives/headers/header.html',
        controller: function($scope,$log,$http) {
          $scope.signUp = function(newUser){
            $log.info($scope.userForm);
            userService.newUser($scope.userForm).then(function(response) {
              $log.info('response from dir controller: ',response)
            })
          }
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
