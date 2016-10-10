'use strict';

function openingDetailsCtrl($scope, $state, $modal, $location, openingsService,vendorService) {

	$scope.openingCandidates = {};
	$scope.openingDetails = {};
	$scope.canidatesList = [];
	$scope.vendorGroups = [];
	var openingId = $scope.$stateParams.id;
	
	$scope.init = function () {
	   openingsService.fnGetOpeningCandidates(openingId).then(function(data){
	        $scope.openingCandidates = data.data.candidates;
	        $scope.canidatesList = $scope.canidatesList.concat($scope.openingCandidates['screening'],$scope.openingCandidates['phone_interview'],$scope.openingCandidates['face_to_face'],$scope.openingCandidates['job_offered'],$scope.openingCandidates['job_accepted'],$scope.openingCandidates['job_rejected']);
	        $scope.openingDetails = data.data;
	      },function(){
	        console.log("in candidateCtrl error:",arguments);
	      });
	}
	$scope.changeStage = function (selectedJob,candidateId) {
		debugger;
	    $modal.open({
	      backdrop: true,
	      backdropClick: false,
	      keyboard: false,
	      templateUrl: 'views/changeStagePopup.html ',
	      controller: 'PopupBoxController',
	      resolve: {
	          model: function() {
	                  return {
	                      title: "",
	                      candidateId:candidateId,
	                      buttons: [{result: true, label: 'Assign', cssClass: 'btn-primary'}],
	                      jobStages: $scope.jobStages,
	                      selectedJob : selectedJob
	                  };
	              }
	      }
	    });
	  };
	$scope.openingCandidatesList = function (stage) {
	   $scope.canidatesList = $scope.openingCandidates[stage];
	}


	$scope.sendToVendors = function (jobId) {
		vendorService.fnGetVendorGroups({}).then(function(data){
	        $scope.vendorGroups = data.data;
	        $scope.openVendorsBox(jobId);
	      },function(){
	        console.log("in vendorgroupsCtrl error:",arguments);
	      });
		
	}
	$scope.openVendorsBox = function (jobId) {
	$scope.jobId = jobId;
	
	$modal.open({
	    backdrop: true,
	    backdropClick: false,
	    keyboard: false,
	    templateUrl: 'views/vendors/openVendorGroupsPopup.html ',
	    controller: 'PopupBoxController',
	    resolve: {
	        model: function() {
	                return {
	                    title: "Select Vendor Group",
	                    jobId:$scope.jobId,
	                    buttons: [{result: true, label: 'Assign', cssClass: 'btn-primary'}],
	                    data: $scope.vendorGroups
	                };
	            }
	    }
	});
  }


	$scope.init();
	
	
}

angular
  .module('urbanApp')
  .controller('openingDetailsCtrl', ['$scope','$state','$modal','$location','openingsService','vendorService', openingDetailsCtrl]);
