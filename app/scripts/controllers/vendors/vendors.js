'use strict';

function vendorsCtrl($scope, $state, $location, AuthService, vendorService, SweetAlert, COLORS) {

  $scope.vendors = {};
  $scope.vendor = {};

  if($scope.user && $scope.user.role.id!=2){
     $state.go('app.dashboard');
  }

  $scope.registerNewVendor = function () {
    $state.go('app.register-vendor');
  }
  
  $scope.editVendor = function(vendorId) {
    $state.go('app.edit-vendor',{"id": vendorId}); 
  }

  $scope.deleteVendor = function(vendorId){
    

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
          vendorService.fnDeleteVendor(vendorId).then(function(response){
            $scope.init();
            swal('Deleted!', 'Vendor Deleted!', 'success');
          },function(){
            console.log("in vendor error:",arguments);
          });
        }
      });
  }

  $scope.init = function () {
    vendorService.fnGetVendors({}).then(function(data){
        $scope.vendors = data.data;
      },function(){
        console.log("in vendorsCtrl error:",arguments);
      });
    
  }

  $scope.init();

}

angular
  .module('urbanApp')
  .controller('vendorsCtrl', ['$scope','$state', '$location', 'AuthService', 'vendorService','SweetAlert','COLORS', vendorsCtrl]);
