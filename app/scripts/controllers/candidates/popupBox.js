'use strict';

    function PopupBoxController($scope, $modalInstance, model, candidateService) {
    $scope.title = model.title;
    $scope.message = model.message;
    $scope.buttons = model.buttons;
    $scope.uploadResume = function(){
        debugger;
        var resume = $scope.resume;

        var fd = new FormData();
         fd.append('resume', resume);


        //$modalInstance.close(res);
        candidateService.fnUploadResumeByFile(
			{id:"5"},fd).then(function(){
				console.log("in candidateCtrl success:",arguments);
				$location.path('/candidateuploaddata/5');
			},function(){
				console.log("in candidateCtrl success:",arguments);
			});
    };
}


angular
  .module('urbanApp')
  .controller('PopupBoxController', ['$scope', '$modalInstance', 'model', 'candidateService', PopupBoxController]);