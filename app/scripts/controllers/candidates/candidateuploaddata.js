'use strict';

function candidateUploadCtrl($scope, $state, $location, $modal, candidateService, $rootScope) {

	$scope.candidateId = $scope.$stateParams.candidateId;
	$scope.skills = {};
	$scope.skillsObj = {};
	$scope.profileObj = {};
	$scope.documents = {};

  $scope.assignOpening = function () {
	$modal.open({
	    backdrop: true,
	    backdropClick: false,
	    keyboard: false,
	    templateUrl: 'views/assignOpeningPopup.html ',
	    controller: 'PopupBoxController',
	    resolve: {
	        model: function() {
	                return {
	                    title: "Assign another opening to Praveen Reddy",
	                    candidateId:$scope.candidateId,
	                    buttons: [{result: true, label: 'Assign', cssClass: 'btn-primary'}],
	                    data: $scope.allJobs
	                };
	            }
	    }
	});
  }
  
  $scope.uploadDocument = function () {
   	$modal.open({
	    backdrop: true,
	    backdropClick: false,
	    keyboard: false,
	    templateUrl: 'views/uploadDocumentPopup.html ',
	    controller: 'PopupBoxController',
	    resolve: {
	        model: function() {
	                return {
	                    title: "Upload a Document",
	                    candidateId:$scope.candidateId,
	                    buttons: [{result: true, label: 'Upload', cssClass: 'btn-primary'}]
	                };
	        }
	    }
	}); 
  }

  $scope.addMoreSkills = function () {
  	$scope.skillsObj.id		=  $scope.candidateId;
  	$scope.skillsObj.skill 	= $scope.skill;
	$scope.skillsObj.experience = $scope.exp;
  	
  	candidateService.fnAddSkills(
		$scope.skillsObj).then(function(response){
			$scope.skill = null;
			$scope.exp = null;
			//$scope.init();
			$scope.skills.push(response.data);
			console.log("in candidateCtrl success:",arguments);
		},function(){
			console.log("in candidateCtrl success:",arguments);
		});
  };

  $scope.getCandidateJobs = function () {
  	var candidate = {};
  	candidate.id = $scope.candidateId;
  	candidateService.fnGetCandidateJobs(
		candidate).then(function(response){
			$scope.candidateJobs = response.data.data;
		},function(){
			console.log("in candidateCtrl success:",arguments);
		});
  };
  $scope.getCandidateJobsHistory = function () {
  	var candidate = {};
  	candidate.id = $scope.candidateId;
  	candidateService.fnGetCandidateJobsHistory(
		candidate).then(function(response){
			$scope.candidateJobsHistory = response.data.data;
		},function(){
			console.log("in candidateCtrl success:",arguments);
		});
  };
  $scope.openingDetails = function(openingId) {
    $state.go('app.opening-details',{"id": openingId});
  }
  $scope.getCandidateProfile = function () {
  	var candidate = {};
  	candidate.id = $scope.candidateId;
  	candidateService.fnGetCandidateProfile(
		candidate).then(function(response){
			$scope.profileObj = response.data;

			$scope.documents = {
				"title":$scope.profileObj.resume_file,
				"created":$scope.profileObj.created_at.date,
				"updated":$scope.profileObj.updated_at.date
			};


		},function(){
			console.log("in candidateCtrl success:",arguments);
		});
  };
  $scope.getAllJobs = function () {
  	var candidate = {};
  	candidateService.fnGetAllJobs(
		candidate).then(function(response){
			$scope.allJobs = response.data.data;
		},function(){
			console.log("in candidateCtrl success:",arguments);
		});
  };

  $rootScope.$on("UpdateAssignedOpenings", function (evt, data) {
  		$scope.candidateJobs.push(data);
  });

  $rootScope.$on("UpdateCandidateResume", function (evt, data) {
  		
  		$scope.documents = data;
  		//$scope.documents.push(data);
  });

  $rootScope.$on("UpdateChangedStage", function (evt, data) {
  		for (var i=0;i<$scope.candidateJobs.length;i++) {
  			if($scope.candidateJobs[i].id === data.id) { 
  				$scope.candidateJobs[i].stage = data.stage;
  				break;
  			}
  		}
  });

  $scope.changeStage = function (selectedJob) {
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
	                    candidateId:$scope.candidateId,
	                    buttons: [{result: true, label: 'Assign', cssClass: 'btn-primary'}],
	                    jobStages: $scope.jobStages,
	                    selectedJob : selectedJob
	                };
	            }
	    }
	});
  };

  $scope.init = function () {
  	
  	var skillsData = {};
  	skillsData.id = $scope.candidateId;
  	candidateService.fnFetchAllSkills(
		skillsData).then(function(response){
			$scope.skills = response.data;
		},function(){
			console.log("in candidateCtrl success:",arguments);
		});
	$scope.getCandidateProfile();
	$scope.getCandidateJobs();
	$scope.getAllJobs();
	$scope.getCandidateJobsHistory();
  }

  $scope.init();

}

angular
  .module('urbanApp')
  .controller('candidateUploadCtrl', ['$scope','$state','$location','$modal', 'candidateService', '$rootScope', candidateUploadCtrl]);
