'use strict';

function openingsCtrl($scope, $state, $location, authService, openingsService) {

  $scope.openings = {};

  $scope.createOpening = function () {
   
    $state.go('app.create-opening');
  }

  $scope.skillSearch = function () {
    $state.go('app.candidateadd',{"page": 'search'});
  }
  $scope.editCandidate = function(candidateId) {
    $state.go('app.candidateuploaddata',{"candidateId": candidateId});
  }
  $scope.init = function () {
   openingsService.fnGetOpenings({}).then(function(data){
        $scope.openings = data.data;
      },function(){
        console.log("in candidateCtrl error:",arguments);
      });
  }

  $scope.init();

}

angular
  .module('urbanApp')
  .controller('openingsCtrl', ['$scope','$state', '$location', 'authService', 'openingsService', openingsCtrl]);
