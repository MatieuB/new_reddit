angular.module('Reddit')
  .directive('mbHeader',function(){
  return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'header.html',
        // scope: {
        //   orderVal: '=',
        //   searchText: '='
        // },

        link: function (scope,  element, attrs ) {
            scope.view = {}
            // scope.view.orderVal = scope.orderVal
            // scope.view.searchText = scope.searchText
            // console.log(scope.view);

            scope.logOrderVal = function(){
              console.log(scope.view);
            }

            scope.setOrderVal = function(newVal) {
              scope.view.currentSort = newVal;
              scope.view.orderVal = newVal === "title" ? newVal : '-' + newVal
            }

          }
        }


  })
