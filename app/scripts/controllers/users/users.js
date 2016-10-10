'use strict';

function usersCtrl($scope, $state, $location, SweetAlert, COLORS, authService, usersService) {

  $scope.users = {};

  $scope.createUser = function () {
   
    $state.go('app.create-user');
  }
  $scope.editUser = function(userId) {
    $state.go('app.edit-user',{"id": userId}); 
  }
  $scope.skillSearch = function () {
    $state.go('app.candidateadd',{"page": 'search'});
  }
  $scope.editCandidate = function(candidateId) {
    $state.go('app.candidateuploaddata',{"candidateId": candidateId});
  }
  $scope.deleteUser = function(userId){
    

    SweetAlert.swal({
        title: 'Are you sure?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: COLORS.danger,
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: false,
        closeOnCancel: true
      },
      function (isConfirm) {
        if (isConfirm) {
          usersService.fnDeleteUser(userId).then(function(response){
            $scope.init();
            swal('Deleted!', 'User Deleted!', 'success');
          },function(){
            console.log("in agency error:",arguments);
          });
        }
      });
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
  .controller('usersCtrl', ['$scope','$state', '$location', 'SweetAlert', 'COLORS', 'authService', 'usersService', usersCtrl]);
