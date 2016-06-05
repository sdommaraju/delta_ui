'use strict';

function openingDetailsCtrl($scope, $state, $modal, $location, openingsService) {

	$scope.openingCandidates = {};
	$scope.openingDetails = {};
	$scope.canidatesList = [];
	var openingId = $scope.$stateParams.id;
	
	$scope.init = function () {
	   openingsService.fnGetOpeningCandidates(openingId).then(function(data){
	   	debugger;
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
	$scope.init();
	
	
}

angular
  .module('urbanApp')
  .controller('openingDetailsCtrl', ['$scope','$state','$modal','$location','openingsService', openingDetailsCtrl]);
