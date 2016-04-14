'use strict';

function candidatesCtrl($scope, $location, authService, candidateService) {

  $scope.candidates = {};

  $scope.testFunction = function () {
    $location.path('/candidateadd');
    authService.fnLogin({
      username:'sdommaraju@innominds.com',
      password:'innominds'
    }).then(function(){
      console.log("in candidateCtrl success:",arguments);
    },function(){
      console.log("in candidateCtrl error:",arguments);
    });
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
  .controller('candidatesCtrl', ['$scope','$location', 'authService', 'candidateService', candidatesCtrl]);
