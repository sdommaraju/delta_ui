'use strict';

    function PopupBoxController($scope, $state, $modalInstance, model, candidateService, $rootScope) {
    $scope.title = model.title;
    $scope.message = model.message;
    $scope.buttons = model.buttons;
    $scope.candidateId = model.candidateId;
    $scope.jobs      = model.data;
    $scope.jobStages = model.jobStages;
    $scope.selectedJob =  model.selectedJob;

    if(model.selectedJob)
      $scope.selectedStage = model.selectedJob.stage; 

    $scope.uploadResume = function(){
        var resume = $scope.resume;

        var fd = new FormData();
         fd.append('resume', resume);


        candidateService.fnUploadResumeByFile(
  			{id:$scope.candidateId},fd).then(function(response){
          $scope.documents = {
            "title":response.data.resume_file,
            "created":response.data.created_at,
            "updated":response.data.updated_at
          };
  				$state.go('app.candidateuploaddata',{"candidateId": $scope.candidateId});
          $modalInstance.close(response.data);
  			},function(){
  				console.log("in candidateCtrl success:",arguments);
  			});
      };

      $scope.assignOpening = function(){
        var candidate = {};
        candidate.id = $scope.candidateId;
        candidate.jobId = $scope.job.id;
        candidateService.fnAssignJobToCandidate(
        candidate).then(function(response){
           $scope.updatedJob = {};
           $scope.updatedJob =  response.data.data;
           $rootScope.$emit("UpdateAssignedOpenings", $scope.updatedJob);
           $modalInstance.close(response.data);
        },function(){
          console.log("in candidateCtrl success:",arguments);
        });
      };

      $scope.changeStage = function () {
        var obj = {};
        obj.candidate_id = $scope.candidateId;
        obj.job_id = $scope.selectedJob;
        obj.stage  = $scope.selectedStage;

        candidateService.fnChangeStage(
        obj).then(function(response){
           $scope.updatedJob = {};
           $scope.updatedJob = response.data.data;
           $state.go('app.candidateuploaddata',{"candidateId": $scope.candidateId});
           $rootScope.$emit("UpdateChangedStage", $scope.updatedJob)
           $modalInstance.close(response.data);
        },function(){
          console.log("in candidateCtrl success:",arguments);
        });


        $scope.selectedJob
        $modalInstance.close({});
      };
}


angular
  .module('urbanApp')
  .controller('PopupBoxController', ['$scope', '$state', '$modalInstance', 'model', 'candidateService', '$rootScope', PopupBoxController]);