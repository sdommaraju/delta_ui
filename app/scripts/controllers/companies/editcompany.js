'use strict';

function editCompanyCtrl($scope, $state, $location, companyService) {

	var companyId = $scope.$stateParams.id;

	$scope.company = {};
	$scope.companyDetails = {};
	$scope.validationOpt = {
	    rules: {
	      name: {
	        required: true,
	        minlength: 3
	      },
	      city: {
	        required: true,
	        minlength: 2
	      },
	      state: {
	        required: true,
	        minlength: 2
	      },
	      contact_name: {
	        required: true,
	        minlength: 2
	      },
	      contact_email: {
	        required: true,
	        email: true
	      }
	    }
	  };

  $scope.updateCompany = function(company){

  	 var $valid = angular.element('#companyForm').valid()
  	if (!$valid) {
        return false;
      }

  	companyService.fnUpdateCompany(companyId,company).then(function(response){
	    $state.go('app.companies');
	  },function(){
	    console.log("in candidateCtrl error:",arguments);
	  });
  }
  

  $scope.init = function () {

    companyService.fnGetCompany(companyId).then(function(data){
        $scope.company = data.data;
      },function(){
        $state.go('app.companies');
      });
    
  }

  $scope.init();


}

angular
  .module('urbanApp')
  .controller('editCompanyCtrl', ['$scope','$state','$location','companyService', editCompanyCtrl]);
