'use strict';

function candidatesCtrl($scope, $state, $location, authService, candidateService) {

  $scope.candidates = {};

  $scope.createCandiate = function () {
   
    $state.go('app.candidateadd',{"page": 'create'});
  }

  $scope.skillSearch = function () {
    $state.go('app.candidateadd',{"page": 'search'});
  }
  
  $scope.editCandidate = function (candidate) {
    //$state.go('app.candidateuploaddata',{"candidateId": candidateId});
    $state.go('app.candidateedit',{"candidateData": JSON.stringify(candidate)});//{"candidateData": candidate});
  }

  $scope.editProfile = function (candidate) {
    $state.go('app.candidateuploaddata',{"candidateId": candidate.id});
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
