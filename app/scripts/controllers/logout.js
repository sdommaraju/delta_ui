'use strict';

function logoutCtrl($scope, $state, $rootScope, AUTH_EVENTS, AuthService, Session) {

  
  $scope.init = function (credentials) {
    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      $scope.setCurrentUser(false);
      $scope.user = false;
      Session.setUserData(false);
      $state.go('user.login');
  };
  $scope.init();

}

angular
  .module('urbanApp')
  .controller('logoutCtrl', ['$scope', '$state', '$rootScope', 'AUTH_EVENTS', 'AuthService','Session', logoutCtrl]);
