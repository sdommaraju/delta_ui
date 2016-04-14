'use strict';

function agenciesCtrl($scope, $state, $location, AuthService, agenciesService) {

  $scope.agencies = {};
  $scope.agency = {};

  $scope.registerNewAgency = function () {
    $state.go('app.register-agency');
  }
  
  $scope.editAgency = function(agencyId) {
    $state.go('app.edit-agency',{"id": agencyId}); 
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
  .controller('agenciesCtrl', ['$scope','$state', '$location', 'AuthService', 'agenciesService', agenciesCtrl]);
