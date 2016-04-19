'use strict';

function loginCtrl($scope, $state, $rootScope, AUTH_EVENTS, AuthService) {

  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.submit = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
      $scope.user = user;
      $state.go('app.dashboard');
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };

}

angular
  .module('urbanApp')
  .controller('loginCtrl', ['$scope', '$state', '$rootScope', 'AUTH_EVENTS', 'AuthService', loginCtrl]);
