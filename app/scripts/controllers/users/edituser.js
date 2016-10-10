'use strict';

function editUserCtrl($scope, $state, $location, usersService) {

	var userId = $scope.$stateParams.id;

	$scope.user = {};
	$scope.appUser = {};
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

  $scope.updateUser = function(user){
  	
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
  $scope.changeRole = function() {
		var role_id = $scope.appUser.role_id;
		if(role_id==4){
			$scope.showGroupName = true;
			$scope.showGroupList = false;
		} else if(role_id==5){
			$scope.showGroupName = false;
			$scope.showGroupList = true;
		} else {
			$scope.showGroupName = false;
			$scope.showGroupList = false;
		}

	}

  $scope.init = function () {

  	usersService.fnGetRoles({}).then(function(data){
        $scope.roles = data.data;
      },function(){
        console.log("in candidateCtrl error:",arguments);
      });
   
   usersService.fnGetGroups({}).then(function(data){
        $scope.groups = data.data;
      },function(){
        console.log("in candidateCtrl error:",arguments);
      });

    usersService.fnGetUserDetails(userId).then(function(data){
        $scope.appUser = data.user;
        //$scope.changeRole();
      },function(){
        $state.go('app.users');
      });

  }
  $scope.init();
}

angular
  .module('urbanApp')
  .controller('editUserCtrl', ['$scope','$state','$location','usersService', editUserCtrl]);
