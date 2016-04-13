'use strict';

function registerAgencyCtrl($scope, $location, agenciesService) {

	$scope.agency = {};
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

  $scope.registerAgency = function(agency){

  	
  	$scope.action = 'agency';
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
      } else {
      	$scope.updateAgency($scope.agency);
      }
      

    },
    onTabClick: function () {
      return false;
    }
  };

}

angular
  .module('urbanApp')
  .controller('registerAgencyCtrl', ['$scope','$location','agenciesService', registerAgencyCtrl]);
