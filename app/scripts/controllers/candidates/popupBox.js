'use strict';

    function PopupBoxController($scope, $state, $modalInstance, model, candidateService) {
    $scope.title = model.title;
    $scope.message = model.message;
    $scope.buttons = model.buttons;
    $scope.candidateId = model.candidateId;

    $scope.uploadResume = function(){
        var resume = $scope.resume;

        var fd = new FormData();
         fd.append('resume', resume);


        candidateService.fnUploadResumeByFile(
  			{id:$scope.candidateId},fd).then(function(response){
  				$state.go('app.candidateuploaddata',{"candidateId": $scope.candidateId});
          $modalInstance.close(response.data);
  			},function(){
  				console.log("in candidateCtrl success:",arguments);
  			});
      };
}


angular
  .module('urbanApp')
  .controller('PopupBoxController', ['$scope', '$state', '$modalInstance', 'model', 'candidateService', PopupBoxController]);