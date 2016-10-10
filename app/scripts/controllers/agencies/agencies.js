'use strict';

function agenciesCtrl($scope, $state, $location, SweetAlert, COLORS, AuthService, agenciesService) {

  $scope.agencies = {};
  $scope.agency = {};
  // if($scope.user && $scope.user.role_id!=1){
  //   $state.go('app.dashboard');
  // }

  $scope.registerNewAgency = function () {
    $state.go('app.register-agency');
  }
  
  $scope.editAgency = function(agencyId) {
    $state.go('app.edit-agency',{"id": agencyId}); 
  }

  $scope.deleteAgency = function(agencyId){
    

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
          agenciesService.fnDeleteAgency(agencyId).then(function(response){
            $scope.init();
            swal('Deleted!', 'Agency Deleted!', 'success');
          },function(){
            console.log("in agency error:",arguments);
          });
        }
      });
  }

  $scope.init = function () {
    agenciesService.fnGetAgencies({}).then(function(data){
        $scope.agencies = data.data;
      },function(){
        console.log("in candidateCtrl error:",arguments);
      });
    
  }

  $scope.init();

}

angular
  .module('urbanApp')
  .controller('agenciesCtrl', ['$scope','$state', '$location', 'SweetAlert','COLORS','AuthService', 'agenciesService', agenciesCtrl]);
