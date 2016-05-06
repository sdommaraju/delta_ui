'use strict';

function registerCompanyCtrl($scope, $state, $location, companyService) {

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

  $scope.createCompany = function(company){
  	
  	var $valid = angular.element('#companyForm').valid()
      if (!$valid) {
        //$validator.focusInvalid();
        return false;
      }

  	companyService.fnAddCompany(company).then(function(response){
	    $scope.companyDetails = response.data.data;
	  },function(){
	    console.log("in candidateCtrl error:",arguments);
	  });
  		$state.go('app.companies')
  }
  $scope.updateAgency = function(agency){
  	debugger;
  	agenciesService.fnUpdateAgencyDetails($scope.agencyDetails.id,agency).then(function(response){
	    $scope.agencyDetails = response.data.data;
	  },function(){
	    console.log("in candidateCtrl error:",arguments);
	  });
  	$scope.action = 'account';
  }
  $scope.wizardOpt = {
    tabClass: '',
    'nextSelector': '.button-next',
    'previousSelector': '.button-previous',
    'firstSelector': '.button-first',
    'lastSelector': '.button-last',
    onNext: function () {
     var $valid = angular.element('#agencyForm').valid(),
        $validator;
      if (!$valid) {
        $validator.focusInvalid();
        return false;
      }

      if($scope.action=='account'){
      	$scope.registerAgency($scope.agency);
      	angular.element('#next-button').html('Finish');
      } else {
      	$scope.updateAgency($scope.agency);
      	angular.element('#next-button').html('Success');
      }
      

    },
    onTabClick: function () {
      return false;
    }
  };

}

angular
  .module('urbanApp')
  .controller('registerCompanyCtrl', ['$scope','$state', '$location','companyService', registerCompanyCtrl]);
