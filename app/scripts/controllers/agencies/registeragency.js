'use strict';

function registerAgencyCtrl($scope, $location, agenciesService) {

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

  $scope.registerAgency = function(agency){
  	debugger;
  	agenciesService.fnAddAgencyAccount(agency).then(function(response){
	    $scope.agencyDetails = response.data.data;
	  },function(){
	    console.log("in candidateCtrl error:",arguments);
	  });
  	$scope.action = 'agency';
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
  .controller('registerAgencyCtrl', ['$scope','$location','agenciesService', registerAgencyCtrl]);
