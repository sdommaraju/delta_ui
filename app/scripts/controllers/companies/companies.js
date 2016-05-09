'use strict';

function companiesCtrl($scope, $state, $location, AuthService, companyService) {

  $scope.companies = {};
  $scope.company = {};
  // if($scope.user && $scope.user.role_id!=1){
  //   $state.go('app.dashboard');
  // }

  $scope.registerNewCompany = function () {
    $state.go('app.register-company');
  }
  
  $scope.editCompany = function(companyId) {
    $state.go('app.edit-company',{"id": companyId}); 
  }
  $scope.init = function () {
    companyService.fnGetCompanies({}).then(function(data){
        $scope.companies = data.data;
      },function(){
        console.log("in candidateCtrl error:",arguments);
      });
    
  }

  $scope.init();

}

angular
  .module('urbanApp')
  .controller('companiesCtrl', ['$scope','$state', '$location', 'AuthService', 'companyService', companiesCtrl]);
