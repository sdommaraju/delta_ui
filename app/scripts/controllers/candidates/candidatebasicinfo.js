'use strict';

function candidateBasicInfoCtrl($scope, $state, $location, candidateService, $rootScope, $routeParams) {

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

	$scope.search = {
		"keyword": "",
		"years": "",
	    "recent": true
	};
	$scope.requestType = $scope.$stateParams.page;

  	$scope.createProfile = function () {
		candidateService.fnAddProfile(
			$scope.profileObj).then(function(response){
				//$rootScope.profileData = 
				//$location.path('/candidateuploaddata');
				$state.go('app.candidateuploaddata',{"candidateId": response.data.id});
			},function(){
				console.log("in candidateCtrl success:",arguments);
			});
  	};

  	$scope.addSkill = function () {
  		//var skills = {[scope.search.keyword,scope.search.years]};

  		candidateService.searchBySkills(
			skills).then(function(){
				console.log("in candidateCtrl success:",arguments);
				//$rootScope.profileData = 
				$location.path('/candidateuploaddata');
			},function(){
				console.log("in candidateCtrl success:",arguments);
			});
  	};

  	$scope.search = function () {
  		var oSkills = {},
	     skillsArr = [];

	    var skill1 = {};
	    skill1[$scope.search.keyword] = $scope.search.years;
	    skillsArr.push(skill1);
	    oSkills.skills = JSON.stringify(skillsArr);

	    candidateService.searchBySkills(
	   oSkills).then(function(response){
	    console.log("in candidateCtrl success:",arguments);
	    $scope.candidates = response.data.data;
	    $scope.requestType = 'search-results';
	   },function(){
	    console.log("in candidateCtrl success:",arguments);
	   });
  	};
}

angular
  .module('urbanApp')
  .controller('candidateBasicInfoCtrl', ['$scope','$state','$location','candidateService', '$rootScope', '$routeParams', candidateBasicInfoCtrl]);
