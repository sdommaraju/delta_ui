'use strict';
angular
  .module('urbanApp')
  .factory('AuthService', function ($http, Session, ajaxService) {
  var authService = {};
  var userData = {
    token:"",
    userId:"",
    roleId:"",
    userName:""
  };
  var output  = {},
      urls    = {
        login: 'http://delta.net/api/access_token'
        //login: 'http://localhost:9001/views/auth.json'
      };

  authService.login = function (credentials) {
    return ajaxService.fnPostData({
        url:urls.login,
        data:credentials
      }).then(function(response){
        debugger;
        userData.token = response.data.access_token;
        Session.setUserData(userData);
        return userData;
      }, function(error){
        return error;
      });

  };
 
  authService.isAuthenticated = function () {
    userData = Session.getUserData();
    return !!userData.token;
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
