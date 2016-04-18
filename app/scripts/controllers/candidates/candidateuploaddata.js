'use strict';

function candidateUploadCtrl($scope, $location, $modal, candidateService) {

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
	                    buttons: [{result: true, label: 'Upload', cssClass: 'btn-primary'}]
	                };
	            }
	    }
	}); 
  }

  $scope.skillsObj = {};
  $scope.addMoreSkills = function () {
  	$scope.skillsObj.id			=  5;
  	$scope.skillsObj.skill 	= $scope.skill;
	$scope.skillsObj.experience = 7;
  	
  	candidateService.fnAddSkills(
		$scope.skillsObj).then(function(){
			console.log("in candidateCtrl success:",arguments);
		},function(){
			console.log("in candidateCtrl success:",arguments);
		});
  }

}

angular
  .module('urbanApp')
  .controller('candidateUploadCtrl', ['$scope','$location','$modal', 'candidateService', candidateUploadCtrl]);
