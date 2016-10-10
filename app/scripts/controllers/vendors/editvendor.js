'use strict';

function editVendorCtrl($scope, $state, $location, vendorService) {

	var vendorId = $scope.$stateParams.id;

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

  $scope.updateVendor = function(vendor){

  	 var $valid = angular.element('#vendorForm').valid()
  	if (!$valid) {
        return false;
      }

  	vendorService.fnUpdateVendor(vendorId,vendor).then(function(response){
	    $state.go('app.vendors');
	  },function(){
	    console.log("in editGroupCtrl error:",arguments);
	  });
  }
  
  $scope.getVendorGroups = function (){
  	vendorService.fnGetVendorGroups({}).then(function(data){
	        $scope.groups = data.data;
	        $scope.init();
	      },function(){
	        console.log("in registerVendorCtrl error:",arguments);
	      });
  }
  $scope.init = function () {

    vendorService.fnGetVendor(vendorId).then(function(data){
        $scope.vendor = data.data;
      },function(){
        $state.go('app.vendors');
      });
    
  }
  $scope.getVendorGroups();
  //$scope.init();

}

angular
  .module('urbanApp')
  .controller('editVendorCtrl', ['$scope','$state','$location','vendorService', editVendorCtrl]);
