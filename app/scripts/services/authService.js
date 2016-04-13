'use strict';

function authService($http, ajaxService) {
  var output  = {},
      urls    = {
        login: 'http://delta.srinutech.com/api/access_token'
        //login: 'http://localhost:9001/views/auth.json'
      };

  output.fnLogin = function (oData) {
      return ajaxService.fnPostData({
        url:urls.login,
        data:oData
      }).then(function(response){
        return response;
      }, function(error){
        return error;
      });
  }


  return output;
}

angular
  .module('urbanApp')
  .factory('authService', ['$http', 'ajaxService', authService]);
