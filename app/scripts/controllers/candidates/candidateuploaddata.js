'use strict';

function candidateUploadCtrl($scope, $location, $modal, candidateService) {

	$scope.candidateId = $scope.$stateParams.candidateId;
	$scope.skills = {};

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
	                    buttons: [{result: true, label: 'Assign', cssClass: 'btn-primary'}]
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

  $scope.skillsObj = {};
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
  }
  $scope.init = function () {
  	
  	var skillsData = {};
  	skillsData.id = $scope.candidateId;
  	candidateService.fnFetchAllSkills(
		skillsData).then(function(response){
			$scope.skills = response.data;
		},function(){
			console.log("in candidateCtrl success:",arguments);
		});
  }
  $scope.init();

}

angular
  .module('urbanApp')
  .controller('candidateUploadCtrl', ['$scope','$location','$modal', 'candidateService', candidateUploadCtrl]);
