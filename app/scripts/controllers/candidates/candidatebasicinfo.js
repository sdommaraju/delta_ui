'use strict';

function candidateBasicInfoCtrl($scope, $location, candidateService) {

	$scope.profileObj = {
		"id": 4,
		"first_name": "",
	    "last_name": "",
	    "email": "",
	    "agency_id": "1",
	    "city": "",
	    "state": "",
	    "phone_number": "",
	    "experience": null,
	    "salary": null,
	    "salary_range": null,
	    "created_by": null,
	    "miles_radius": null
	};
  	$scope.createProfile = function () {
		candidateService.fnAddProfile(
			$scope.profileObj).then(function(){
				console.log("in candidateCtrl success:",arguments);
				$location.path('/candidateuploaddata');
			},function(){
				console.log("in candidateCtrl success:",arguments);
			});
  	}

}

angular
  .module('urbanApp')
  .controller('candidateBasicInfoCtrl', ['$scope','$location','candidateService', candidateBasicInfoCtrl]);
