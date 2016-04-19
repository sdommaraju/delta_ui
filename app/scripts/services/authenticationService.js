'use strict';
angular
  .module('urbanApp')
  .factory('AuthService', function ($http, Session, ajaxService) {
  var authService = {};
  var sessionData = {};
  var output  = {},
      urls    = {
        login: 'http://delta.srinutech.com/api/access_token',
        profile: 'http://delta.srinutech.com/api/user/profile',
        //login: 'http://localhost:9001/views/auth.json'
      };

  authService.login = function (credentials) {
    return ajaxService.fnPostData({
        url:urls.login,
        data:credentials
      }).then(function(response){
        debugger;
        sessionData.token = response.data.access_token;
        Session.setUserData(sessionData);
        
        ajaxService.fnGetData({
          url:urls.profile,
          data:sessionData
        }).then(function(response){
          var token = sessionData.token;
          sessionData = response.data.data;
          sessionData.token = token;
          Session.setUserData(sessionData);
          return sessionData;
        }, function(error){
          return error;
        });

        return sessionData;
      }, function(error){
        return error;
      });

  };
 
  authService.isAuthenticated = function () {
    var loginData = Session.getUserData();
    return !!loginData.token;
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
