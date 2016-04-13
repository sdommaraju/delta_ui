'use strict';

function agenciesService($http, ajaxService) {
  var output  = this,
      urls    = {
        addAgency: 'http://delta.net/api/agency',
        getAgencies: 'http://delta.net/api/agency',
      };

  output.fnGetData = function (oData) {
      return $http.get({url:oData.url}).then(function(response){
        return response.data;
      }, function(error){
        return error;
      });
  }

  output.fnAddProfile = function (oData) {
    return ajaxService.fnPostData({
      url:urls.login,
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }

  output.fnGetAgencies = function () {
    return ajaxService.fnGetData({
      url:urls.getAgencies,
      data:{}
    }).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }

}

angular
  .module('urbanApp')
  .service('agenciesService', ['$http','ajaxService', agenciesService]);
