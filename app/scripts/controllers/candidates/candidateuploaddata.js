'use strict';

function candidateUploadCtrl($scope, $location, $modal) {

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

}

angular
  .module('urbanApp')
  .controller('candidateUploadCtrl', ['$scope','$location','$modal', candidateUploadCtrl]);
