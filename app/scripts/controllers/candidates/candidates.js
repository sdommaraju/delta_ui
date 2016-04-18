'use strict';

function candidatesCtrl($scope, $state, $location, authService, candidateService) {

  $scope.candidates = {};

  $scope.createCandiate = function () {
    
   
    $state.go('app.candidateadd',{"page": 'create'});
  }

  $scope.skillSearch = function () {
    $state.go('app.candidateadd',{"page": 'search'});
  }

  $scope.init = function () {
   candidateService.fnGetCandidates({}).then(function(data){
        $scope.candidates = data.data;
      },function(){
        console.log("in candidateCtrl error:",arguments);
      });
  }

  $scope.init();

}

angular
  .module('urbanApp')
  .controller('candidatesCtrl', ['$scope','$state', '$location', 'authService', 'candidateService', candidatesCtrl]);
