'use strict';

function createOpeningCtrl($scope, $state, $location, openingsService) {

	$scope.opening = {};
	$scope.openingDetails = {};
	$scope.companyDetails = {};
	$scope.company = {};
	$scope.companies = {};
	$scope.action = 'account';

	$scope.validationOpt = {
	    rules: {
	      title: {
	        required: true,
	        minlength: 3
	      },
	      position_type: {
	        required: true
	      },
	      description: {
	        required: true,
	        minlength: 1
	      },
	      company_id: {
	        required: true
	      },
	      bill_rate: {
	        required: true
	      },
	      pay_rate: {
	        required: true
	      },
	      start_date: {
	        required: true
	      },
	      end_date: {
	        required: true
	      },
	      openings_available: {
	        required: true
	      },
	      max_allowed_submissions: {
	        required: true
	      }
	    }
	  };
	
	$scope.init = function () {
	   openingsService.fnGetCompanies({}).then(function(data){
	        $scope.companies = data.data;
	      },function(){
	        console.log("in candidateCtrl error:",arguments);
	      });
	  }

	$scope.init();
	
	$scope.changeCompany = function() {
		var companyId = $scope.opening.company_id;
		$scope.companyDetails = $scope.companies.filter(function(company){
         return company.id==companyId;
        });
        $scope.company = $scope.companyDetails[0];
	}

	$scope.createOpening = function(opening){
	  	opening.agency_id=18;
	  	openingsService.fnAddOpening(opening).then(function(response){
		    $scope.openingDetails = response.data.data;
		    $state.go('app.openings');
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
	        //$validator.focusInvalid();
	        return false;
	      }
	      if(index==3){
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
  .controller('createOpeningCtrl', ['$scope','$state','$location','openingsService', createOpeningCtrl]);
