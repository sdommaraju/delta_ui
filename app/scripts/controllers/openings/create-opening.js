'use strict';

function createOpeningCtrl($scope, $location, openingsService) {

	$scope.opening = {};
	$scope.openingDetails = {};
	$scope.action = 'account';
	/*$scope.validationOpt = {
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
	*/
  $scope.createOpening = function(opening){
  	debugger;
  	openingsService.fnAddOpening(opening).then(function(response){
	    $scope.openingDetails = response.data.data;
	  },function(){
	    console.log("in candidateCtrl error:",arguments);
	  });
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
    onNext: function (tab, navigation, index) {

     var $valid = angular.element('#openingForm').valid(),
        $validator;
      if (!$valid) {
        $validator.focusInvalid();
        return false;
      }
      if(index==4){
      	$scope.createOpening($scope.opening);
      }

    },
    onTabClick: function () {
      return false;
    }
  };

}

angular
  .module('urbanApp')
  .controller('createOpeningCtrl', ['$scope','$location','openingsService', createOpeningCtrl]);
