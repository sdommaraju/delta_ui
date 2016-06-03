'use strict';

function companyService($http, ajaxService) {
  var output  = this,
      urls    = {
        addCompany: ajaxService.config.api_url+'companies',
        updateCompany: ajaxService.config.api_url+'companies',
        getCompanies: ajaxService.config.api_url+'companies',
      };

  output.fnGetData = function (oData) {
      return $http.get({url:oData.url}).then(function(response){
        return response.data;
      }, function(error){
        return error;
      });
  }

  output.fnAddCompany = function (oData) {
    return ajaxService.fnPostData({
      url:urls.addCompany,
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }
  output.fnUpdateCompany = function (companyId,oData) {
    return ajaxService.fnPutData({
      url:urls.updateCompany+'/'+companyId,
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }
  output.fnGetCompanies = function () {
    return ajaxService.fnGetData({
      url:urls.getCompanies,
      data:{}
    }).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }
  output.fnGetCompany = function(companyId) {
    return ajaxService.fnGetData({
      url:urls.getCompanies+'/'+companyId,
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
  .service('companyService', ['$http','ajaxService', companyService]);
