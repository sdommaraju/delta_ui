var PopupBoxController = ['$scope', '$modalInstance', 'model', 'candidateService',
    function ($scope, $modalInstance, model, candidateService) {
    $scope.title = model.title;
    $scope.message = model.message;
    $scope.buttons = model.buttons;
    $scope.close = function(res){
        //$modalInstance.close(res);
        candidateService.fnUploadResumeByFile(
			{id:"5"}).then(function(){
				console.log("in candidateCtrl success:",arguments);
				//$location.path('/candidateuploaddata');
			},function(){
				console.log("in candidateCtrl success:",arguments);
			});
    };
}];
