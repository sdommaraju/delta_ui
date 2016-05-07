'use strict';

function usersCtrl($scope, $state, $location, authService, usersService) {

  $scope.users = {};

  $scope.createUser = function () {
   
    $state.go('app.create-user');
  }

  $scope.skillSearch = function () {
    $state.go('app.candidateadd',{"page": 'search'});
  }
  $scope.editCandidate = function(candidateId) {
    $state.go('app.candidateuploaddata',{"candidateId": candidateId});
  }
  $scope.init = function () {
   usersService.fnGetUsers({}).then(function(data){
        $scope.users = data.data;
      },function(){
        console.log("in candidateCtrl error:",arguments);
      });
  }

  $scope.init();

}

angular
  .module('urbanApp')
  .controller('usersCtrl', ['$scope','$state', '$location', 'authService', 'usersService', usersCtrl]);
