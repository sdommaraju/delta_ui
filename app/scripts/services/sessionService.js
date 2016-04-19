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
      debugger;
      $window.localStorage && $window.localStorage.setItem('my-storage', JSON.stringify(data));
      return this;
    },
    getUserData: function() {
      if($window.localStorage)
        return JSON.parse($window.localStorage.getItem('my-storage'));
      else
        return false;
    }
  };

})
