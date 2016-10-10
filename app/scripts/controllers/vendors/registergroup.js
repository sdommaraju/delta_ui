'use strict';

function registerGroupCtrl($scope, $state, $location, vendorService) {

	$scope.group = {};
	$scope.groupDetails = {};
	$scope.validationOpt = {
	    rules: {
	      name: {
	        required: true,
	        minlength: 3
	      }
	    }
	  };

  $scope.createVendorGroup = function(group){
  	
  	var $valid = angular.element('#groupForm').valid()
      if (!$valid) {
        //$validator.focusInvalid();
        return false;
      }

  	vendorService.fnAddVendorGroup(group).then(function(response){
	    $scope.groupDetails = response.data.data;
	    $state.go('app.groups');
	  },function(){
	    console.log("in registerGroupCtrl error:",arguments);
	  });
  	  
  }

}

angular
  .module('urbanApp')
  .controller('registerGroupCtrl', ['$scope','$state', '$location','vendorService', registerGroupCtrl]);
