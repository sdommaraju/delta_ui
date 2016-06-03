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


      if($scope.user.role.id==1){
        $state.go('app.agencies');
      } else if($scope.user.role.id) {
        $state.go('app.dashboard');  
      } else {
        $state.go('user.login'); 
      }
      
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };

}

angular
  .module('urbanApp')
  .controller('loginCtrl', ['$scope', '$state', '$rootScope', 'AUTH_EVENTS', 'AuthService', loginCtrl]);
