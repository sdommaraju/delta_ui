'use strict';

function ajaxService($http,Session) {
  var output = {},
    config = {
      grant_type:'password',
      client_id:'f3d259ddd3ed8ff3843839b',
      client_secret:'4c7f6f8fa93d59c45502c0ae8c4a95b'
    };


  var oToken = Session.getUserData();
  output.access_token = null;
  if(oToken){
    output.access_token = oToken.token;  
  }
  

  output.fnGetData = function (oData) {
    //angular.extend(oData.data, config);
    output.access_token = Session.getUserData().token;
    if(output.access_token){
      oData.data.access_token = output.access_token;
    }

    $http.defaults.headers.common.Accept = "application/vnd.delta.v1+json";
    $http.defaults.headers.common.Authorization = "Bearer "+oData.data.access_token;
    
    return $http.get(
      oData.url+"?access_token="+oData.data.access_token,{
      params: oData.data
    }).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }

  output.fnPostData = function (oData) {
      angular.extend(oData.data, config);
      if(output.access_token){
        oData.data.access_token = output.access_token;
      }
      $http.defaults.headers.common.Accept = "application/vnd.delta.v1+json";
      $http.defaults.headers.common.Authorization = "Bearer "+oData.data.access_token;
      return $http.post(oData.url, oData.data).then(function(response){
        return response;
      }, function(error){
        return error;
      });
  }

  output.fnPostDataFile = function (oData) {
    debugger;
      angular.extend(oData.data, config);
      if(output.access_token){
        oData.data.access_token = output.access_token;
      }
      $http.defaults.headers.common.Accept = "application/vnd.delta.v1+json";
      $http.defaults.headers.common.Authorization = "Bearer "+oData.data.access_token;
      return $http.post(oData.url, oData.data, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               }).then(function(response){
        return response;
      }, function(error){
        return error;
      });
  }

  output.fnPutData = function (oData) {
    debugger;
      angular.extend(oData.data, config);
      if(output.access_token){
        oData.data.access_token = output.access_token;
      }
      $http.defaults.headers.common.Accept = "application/vnd.delta.v1+json";
      $http.defaults.headers.common.Authorization = "Bearer "+oData.data.access_token;
      return $http.post(oData.url, JSON.stringify(oData.data), {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               }).then(function(response){
        return response;
      }, function(error){
        return error;
      });
  }


  // output.fnPutData = function (oData) {
  //     angular.extend(oData.data, config);
  //     if(output.access_token){
  //       oData.data.access_token = output.access_token;
  //     }
  //     $http.defaults.headers.common.Accept = "application/vnd.delta.v1+json";
  //     $http.defaults.headers.common.Authorization = "Bearer "+oData.data.access_token;

  //     return $http.put(oData.url, oData.data, {
  //                 transformRequest: angular.identity,
  //                 headers: {'Content-Type': undefined}
  //              }).then(function(response){
  //       return response;
  //     }, function(error){
  //       return error;
  //     });
  // }

  return output;
}

angular
  .module('urbanApp')
  .factory('ajaxService', ['$http','Session', ajaxService]);
