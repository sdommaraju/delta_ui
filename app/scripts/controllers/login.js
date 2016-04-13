'use strict';

function loginCtrl($scope, $rootScope, AUTH_EVENTS, AuthService) {

  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };

}

angular
  .module('urbanApp')
  .controller('loginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', loginCtrl]);
