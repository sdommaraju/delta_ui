var PopupBoxController = ['$scope', '$modalInstance', 'model',
    function ($scope, $modalInstance, model) {
    $scope.title = model.title;
    $scope.message = model.message;
    $scope.buttons = model.buttons;
    $scope.close = function(res){
        $modalInstance.close(res);
    };
}];