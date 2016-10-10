'use strict';
angular
  .module('urbanApp')
  .factory('Session', function ($window, $rootScope) {
     angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
          $rootScope.$apply();
        }
      });

    return {
    setUserData: function(data) {
      
      $window.sessionStorage && $window.sessionStorage.setItem('my-storage', JSON.stringify(data));
      return this;
    },
    getUserData: function() {
      if($window.sessionStorage)
        return JSON.parse($window.sessionStorage.getItem('my-storage'));
      else
        return false;
    }
  };

})
