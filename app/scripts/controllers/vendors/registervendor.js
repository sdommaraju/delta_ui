'use strict';

function registerVendorCtrl($scope, $state, $location, vendorService) {

	$scope.vendor = {};
	$scope.vendorDetails = {};
	$scope.validationOpt = {
	    rules: {
	      name: {
	        required: true,
	        minlength: 3
	      },
	      email_id: {
	        required: true,
	        minlength: 3,
	        email : true
	      },
	      vendor_group_id: {
	        required: true
	      }
	    }
	  };

  $scope.createVendor = function(group){
  	
  	var $valid = angular.element('#vendorForm').valid()
      if (!$valid) {
        //$validator.focusInvalid();
        return false;
      }

  	vendorService.fnAddVendor(group).then(function(response){
	    $scope.vendorDetails = response.data.data;
	    $state.go('app.vendors');
	  },function(){
	    console.log("in registerVendorCtrl error:",arguments);
	  });
  	  
  }

  $scope.init = function () {
	   vendorService.fnGetVendorGroups({}).then(function(data){
	        $scope.groups = data.data;
	      },function(){
	        console.log("in registerVendorCtrl error:",arguments);
	      });

	  }

	$scope.init();

}

angular
  .module('urbanApp')
  .controller('registerVendorCtrl', ['$scope','$state', '$location','vendorService', registerVendorCtrl]);
