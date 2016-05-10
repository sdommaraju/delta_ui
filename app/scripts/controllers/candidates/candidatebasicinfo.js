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

	$scope.searchSkills = [{}];

	$scope.search = {
		"keyword": "",
		"years": "",
	    "recent": true
	};
	
	$scope.requestType = $scope.$stateParams.candidateData ? "create" :  $scope.$stateParams.page;
	$scope.profileObj  = $scope.$stateParams.candidateData ? JSON.parse($scope.$stateParams.candidateData) : $scope.profileObj;
	$scope.profileBtn  = $scope.$stateParams.candidateData ? "Edit Profile" : "Create Profile";

  	$scope.createProfile = function () {
  		if($scope.profileBtn == "Create Profile"){
  			candidateService.fnAddProfile(
			$scope.profileObj).then(function(response){
				$state.go('app.candidateuploaddata',{"candidateId": response.data.id});
			},function(){
				console.log("in candidateCtrl success:",arguments);
			});
  		}
  		else{
			candidateService.fnEditProfile(
				$scope.profileObj).then(function(response){
					$state.go('app.candidateuploaddata',{"candidateId": response.data.id});
				},function(){
					console.log("in candidateCtrl success:",arguments);
				});
  		}
		
  	};

  	$scope.addSkill = function () {
  		//var skills = {[scope.search.keyword,scope.search.years]};
  		$scope.searchSkills.push({});

  		/*candidateService.searchBySkills(
			skills).then(function(){
				console.log("in candidateCtrl success:",arguments);
				//$rootScope.profileData = 
				$location.path('/candidateuploaddata');
			},function(){
				console.log("in candidateCtrl success:",arguments);
			});*/
  	};

  	$scope.search = function () {
  		var oSkills = {},
	     skillsArr = [];
	    debugger;
	    angular.forEach($scope.searchSkills,function(value){
	    	skillsArr.push({"skill":value.keyword, "experience":value.years});
	    });
	    //skillsArr.push({"skill":$scope.search.keyword, "experience":$scope.search.years});
		oSkills.skills = JSON.stringify(skillsArr);
		
		oSkills.state = ($scope.search.state)?$scope.search.state:'';
		oSkills.city = ($scope.search.city)?$scope.search.city:'';
		oSkills.zip = ($scope.search.zip)?$scope.search.zip:'';
		oSkills.pay_range_min = ($scope.search.pay_range_min)?$scope.search.pay_range_min:'';
		oSkills.pay_range_max = ($scope.search.pay_range_max)?$scope.search.pay_range_max:'';

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
