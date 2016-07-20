'use strict';

function editAgencyCtrl($scope, $state, $location, agenciesService) {

	var agencyId = $scope.$stateParams.id;

	$scope.agency = {};
	$scope.agencyDetails = {};
	$scope.action = 'account';
	$scope.validationOpt = {
	    rules: {
	      email: {
	        required: true,
	        email: true,
	        minlength: 3
	      },
	      name: {
	        required: true,
	        minlength: 3
	      },
	      address: {
	        required: true,
	        minlength: 1
	      },
	      phone_number: {
	        required: true,
	        minlength: 2
	      },
	      city: {
	        required: true,
	        minlength: 2
	      },
	      state: {
	        required: true,
	        minlength: 2
	      },
	      zip: {
	        required: true,
	        minlength: 5
	      }
	    }
	  };

  $scope.updateAgency = function(agency){
  	
  	var $valid = angular.element('#agencyForm').valid(),$validator;
  		
      if (!$valid) {
       
        return false;
      }

  	agenciesService.fnUpdateAgencyDetails(agencyId,agency).then(function(response){
	    $state.go('app.agencies');
	  },function(){
	    console.log("in candidateCtrl error:",arguments);
	  });
  }
  

  $scope.init = function () {

    agenciesService.fnGetAgency(agencyId).then(function(data){
        $scope.agency = data.data;
      },function(){
        $state.go('app.agencies');
      });
    
  }

  $scope.init();


}

angular
  .module('urbanApp')
  .controller('editAgencyCtrl', ['$scope','$state','$location','agenciesService', editAgencyCtrl]);
