'use strict';

function agenciesCtrl($scope, $state, $location, authService, agenciesService) {

  $scope.agencies = {};

  $scope.registerNewAgency = function () {
    $state.go('app.register-agency');
  }

  $scope.init = function () {
    authService.fnLogin({
      username:'sdommaraju@innominds.com',
      password:'innominds'
    }).then(function(){
      
      agenciesService.fnGetAgencies({}).then(function(data){
        $scope.agencies = data.data;
      },function(){
        console.log("in candidateCtrl error:",arguments);
      });

    },function(){
      console.log("in candidateCtrl error:",arguments);
    });

    
  }

  $scope.init();

}

angular
  .module('urbanApp')
  .controller('agenciesCtrl', ['$scope','$state', '$location', 'authService', 'agenciesService', agenciesCtrl]);
