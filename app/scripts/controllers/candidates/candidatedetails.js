'use strict';

function candidatesDetailsCtrl($scope, $location, $state, $modal) {

var buttons = {
        "DISMISS": [{result: true, label: 'OK', cssClass: 'btn-primary'}],
        "OKCANCEL": [{result: true, label: 'OK', cssClass: 'btn-primary'}, {result:false, label: 'Cancel'}],
        "YESNO": [{result: true, label: 'Yes', cssClass: 'btn-primary'}, {result:false, label: 'No', cssClass: 'btn'}],
        "YESNOCANCEL": [{result: true, label: 'Yes', cssClass: 'btn-primary'}, {result:false, label: 'No', cssClass: 'btn'}, {result:null, label: 'Cancel'}]
    };

  $scope.showPopup = function () {
    	$modal.open({
            backdrop: true,
            backdropClick: false,
            keyboard: false,
            templateUrl: 'views/uploadDocumentPopup.html ',
            //controller: 'MessageBoxController',
            resolve: {
                model: function() {
                        return {
                            title: "title11111",
                            message: "11111111",
                            buttons: [{result: true, label: 'OK', cssClass: 'btn-primary'}]
                        };
                    }
            }
        });
  }

}

angular
  .module('urbanApp')
  .controller('candidatesDetailsCtrl', ['$scope','$location','$state','$modal', candidatesDetailsCtrl]);
