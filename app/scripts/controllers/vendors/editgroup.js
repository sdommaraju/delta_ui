'use strict';

function editGroupCtrl($scope, $state, $location, vendorService) {

	var groupId = $scope.$stateParams.id;

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

  $scope.updateVendorGroup = function(group){

  	 var $valid = angular.element('#groupForm').valid()
  	if (!$valid) {
        return false;
      }

  	vendorService.fnUpdateVendorGroup(groupId,group).then(function(response){
	    $state.go('app.groups');
	  },function(){
	    console.log("in editGroupCtrl error:",arguments);
	  });
  }
  

  $scope.init = function () {

    vendorService.fnGetVendorGroup(groupId).then(function(data){
        $scope.group = data.data;
      },function(){
        $state.go('app.groups');
      });
    
  }

  $scope.init();


}

angular
  .module('urbanApp')
  .controller('editGroupCtrl', ['$scope','$state','$location','vendorService', editGroupCtrl]);
