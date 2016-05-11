angular.module('Reddit')
  .controller('Main',['$scope','$log','$http','postService',function($scope,$log,$http,postService) {
    $scope.view=""
    $scope.view.orderVal = ""
    $scope.view.searchText=""

  }])
