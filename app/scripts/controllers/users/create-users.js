'use strict';

function createUserCtrl($scope, $state, $location, usersService) {

	$scope.users = {};
	$scope.userDetails = {};
	$scope.roles = {};

	$scope.validationOpt = {
	    rules: {
	      first_name: {
	        required: true,
	        minlength: 3
	      },
	      last_name: {
	        required: true
	      },
	      email: {
	        required: true,
	        email:true,
	        minlength: 1
	      },
	      password: {
	        required: true
	      },
	      role_id: {
	        required: true
	      }
	    }
	  };
	
	$scope.init = function () {
	   usersService.fnGetRoles({}).then(function(data){
	        $scope.roles = data.data;
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

	$scope.createUser = function(appUser){
		
		var $valid = angular.element('#userForm').valid();
	      if (!$valid) {
	        return false;
	      }

	  	usersService.fnAddUser(appUser).then(function(response){
		    $scope.userDetails = response.data.data;
		    $state.go('app.users');
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
  .controller('createUserCtrl', ['$scope','$state','$location','usersService', createUserCtrl]);
