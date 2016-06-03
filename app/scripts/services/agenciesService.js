'use strict';

function agenciesService($http, ajaxService) {
  var output  = this,
      urls    = {
        addAgency: ajaxService.config.api_url+'agency',
        updateAgency: ajaxService.config.api_url+'agency',
        getAgencies: ajaxService.config.api_url+'agency',
      };

  output.fnGetData = function (oData) {
      return $http.get({url:oData.url}).then(function(response){
        return response.data;
      }, function(error){
        return error;
      });
  }

  output.fnAddAgencyAccount = function (oData) {
    return ajaxService.fnPostData({
      url:urls.addAgency,
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }
  output.fnUpdateAgencyDetails = function (agencyId,oData) {
    return ajaxService.fnPutData({
      url:urls.updateAgency+'/'+agencyId,
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
  output.fnGetAgency = function(agencyId) {
    return ajaxService.fnGetData({
      url:urls.getAgencies+'/'+agencyId,
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
