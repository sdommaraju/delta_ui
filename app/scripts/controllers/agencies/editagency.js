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
	      first_name: {
	        required: true,
	        minlength: 3
	      },
	      last_name: {
	        required: true,
	        minlength: 1
	      },
	      password: {
	        required: true,
	        minlength: 6
	      },
	      confirm_password: {
	        required: true,
	        minlength: 6,
	        equalTo: '#password'
	      },
	      name: {
	        required: true,
	        minlength: 3
	      }
	    }
	  };

  $scope.updateAgency = function(agency){

  	/*var $valid = angular.element('#agencyForm').valid(),
        $validator;
      if (!$valid) {
        $validator.focusInvalid();
        return false;
      }*/

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
