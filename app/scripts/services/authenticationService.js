'use strict';
angular
  .module('urbanApp')
  .factory('AuthService', function ($http, Session, ajaxService) {
  var authService = {};
 
  var output  = {},
      urls    = {
        login: 'http://delta.srinutech.com/api/access_token'
        //login: 'http://localhost:9001/views/auth.json'
      };

  authService.login = function (credentials) {
    return ajaxService.fnPostData({
        url:urls.login,
        data:credentials
      }).then(function(response){
        Session.create(response.access_token, 1,
                       'admin');
        return response.data;
      }, function(error){
        return error;
      });

  };
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
})
