'use strict';

angular
  .module('urbanApp')
  .controller('AppCtrl', ['$scope', '$http', '$localStorage','USER_ROLES','AuthService','Session',
        function AppCtrl($scope, $http, $localStorage,USER_ROLES,AuthService,Session) {

      $scope.mobileView = 767;
      $scope.currentUser = null;
      $scope.userRoles = USER_ROLES;
      $scope.isAuthorized = AuthService.isAuthorized;
      $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
      };
      
      $scope.app = {
        name: 'Urban',
        author: 'Nyasha',
        version: '1.0.0',
        year: (new Date()).getFullYear(),
        layout: {
          isSmallSidebar: false,
          isChatOpen: false,
          isFixedHeader: true,
          isFixedFooter: false,
          isBoxed: false,
          isStaticSidebar: false,
          isRightSidebar: false,
          isOffscreenOpen: false,
          isConversationOpen: false,
          isQuickLaunch: false,
          sidebarTheme: '',
          headerTheme: ''
        },
        isMessageOpen: false,
        isConfigOpen: false
      };

      $scope.user = {
        fname: 'Samuel',
        lname: 'Perkins',
        jobDesc: 'Human Resources Guy',
        avatar: 'images/avatar.jpg',
      };
      debugger;
      $scope.user = Session.getUserData();
      if (angular.isDefined($localStorage.layout)) {
        $scope.app.layout = $localStorage.layout;
      } else {
        $localStorage.layout = $scope.app.layout;
      }

      $scope.$watch('app.layout', function () {
        $localStorage.layout = $scope.app.layout;
      }, true);

      $scope.getRandomArbitrary = function () {
        return Math.round(Math.random() * 100);
      };
    }
]);
