'use strict';

function vendorgroupsCtrl($scope, $state, $location, AuthService, vendorService, SweetAlert, COLORS) {

  $scope.groups = {};
  $scope.group = {};

  if($scope.user && $scope.user.role.id!=2){
     $state.go('app.dashboard');
  }

  $scope.registerNewVendorGroup = function () {
    $state.go('app.register-group');
  }
  
  $scope.editVendorGroup = function(groupId) {
    $state.go('app.edit-group',{"id": groupId}); 
  }

  $scope.deleteVendorGroup = function(groupId){
    

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
          vendorService.fnDeleteVendorGroup(groupId).then(function(response){
            $scope.init();
            swal('Deleted!', 'Group Deleted!', 'success');
          },function(){
            console.log("in group error:",arguments);
          });
        }
      });
  }

  $scope.init = function () {
    vendorService.fnGetVendorGroups({}).then(function(data){
        $scope.groups = data.data;
      },function(){
        console.log("in vendorgroupsCtrl error:",arguments);
      });
    
  }

  $scope.init();

}

angular
  .module('urbanApp')
  .controller('vendorgroupsCtrl', ['$scope','$state', '$location', 'AuthService', 'vendorService','SweetAlert','COLORS', vendorgroupsCtrl]);
