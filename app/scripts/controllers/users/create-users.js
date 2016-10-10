'use strict';

function createUserCtrl($scope, $state, $location, usersService) {

	$scope.users = {};
	$scope.userDetails = {};
	$scope.roles = {};
	$scope.appUser = {};

	$scope.validationOpt = {
	    rules: {
	      first_name: {
	        required: true,
	        minlength: 3
	      },
	      last_name: {
	        required: true
	      },
	      emailId: {
	        required: true,
	        email:true,
	        minlength: 1
	      },
	      passwordId: {
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
	   
	   usersService.fnGetGroups({}).then(function(data){
	        $scope.groups = data.data;
	      },function(){
	        console.log("in candidateCtrl error:",arguments);
	      });
	}

	$scope.init();
	
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
		debugger;
	}

	$scope.createUser = function(appUser){
		var $valid = angular.element('#userForm').valid();
	      if (!$valid) {
	        return false;
	      }
	    if($scope.showGroupName){
			appUser.group_type='add';
		} else if($scope.showGroupList){
			appUser.group_type='select';
		} else {
			appUser.group_type='na';
		}
	  	usersService.fnAddUser(appUser).then(function(response){
		    $scope.userDetails = response.data.data;
		    $state.go('app.users');
		  },function(){
		    console.log("in candidateCtrl error:",arguments);
		  });
	  }
	  
	  

	}

angular
  .module('urbanApp')
  .controller('createUserCtrl', ['$scope','$state','$location','usersService', createUserCtrl]);
