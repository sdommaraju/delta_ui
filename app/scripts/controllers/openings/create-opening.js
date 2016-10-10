'use strict';

function createOpeningCtrl($scope, $state, $location, openingsService,usersService) {

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
	      client_name: {
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
	   usersService.fnGetGroups({}).then(function(data){
	        $scope.groups = data.data;
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
        $scope.company.client_name = $scope.companyDetails[0].name;
        //$scope.company.contact_email = $scope.companyDetails[0].contact_email;
        $scope.company.contact_location = $scope.companyDetails[0].city+','+$scope.companyDetails[0].state;
	}

	$scope.createOpening = function(opening,company){
		var openingDetails = angular.extend({},opening,company);
		openingsService.fnAddOpening(openingDetails).then(function(response){
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
	      if(index==4){
	      	$scope.createOpening($scope.opening,$scope.company);
	      }

	    },
	    onTabClick: function () {
	      return false;
	    }
	  };

	}

angular
  .module('urbanApp')
  .controller('createOpeningCtrl', ['$scope','$state','$location','openingsService','usersService', createOpeningCtrl]);
