'use strict';

function vendorService($http, ajaxService) {
  var output  = this,
      urls    = {
        addVendorGroup: ajaxService.config.api_url+'vendor/group',
        updateVendorGroup: ajaxService.config.api_url+'vendor/group',
        getVendorGroups: ajaxService.config.api_url+'vendor/group',
        addVendor: ajaxService.config.api_url+'vendor',
        updateVendor: ajaxService.config.api_url+'vendor',
        getVendors: ajaxService.config.api_url+'vendor',
        getEmailVendors: ajaxService.config.api_url+'vendor/sendemail',
      };

  output.fnGetData = function (oData) {
      return $http.get({url:oData.url}).then(function(response){
        return response.data;
      }, function(error){
        return error;
      });
  }

  output.fnAddVendorGroup = function (oData) {
    return ajaxService.fnPostData({
      url:urls.addVendorGroup,
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }
  output.fnUpdateVendorGroup = function (groupId,oData) {
    return ajaxService.fnPutData({
      url:urls.updateVendorGroup+'/'+groupId,
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }
  output.fnGetVendorGroups = function () {
    return ajaxService.fnGetData({
      url:urls.getVendorGroups,
      data:{}
    }).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }
  output.fnSendEmailToVendors = function (groupId,oData) {
    return ajaxService.fnPostData({
      url:urls.getEmailVendors+'/'+groupId,
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }
  output.fnGetVendorGroup = function(groupId) {
    return ajaxService.fnGetData({
      url:urls.getVendorGroups+'/'+groupId,
      data:{}
    }).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }
  output.fnDeleteVendorGroup = function (groupId) {
    return ajaxService.fnDeleteData({
      url:urls.getVendorGroups+'/'+groupId,data:{}}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }

  output.fnAddVendor = function (oData) {
    return ajaxService.fnPostData({
      url:urls.addVendor,
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }
  output.fnUpdateVendor = function (vendorId,oData) {
    return ajaxService.fnPutData({
      url:urls.updateVendor+'/'+vendorId,
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }
  output.fnGetVendors = function () {
    return ajaxService.fnGetData({
      url:urls.getVendors,
      data:{}
    }).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }
  output.fnGetVendor = function(vendorId) {
    return ajaxService.fnGetData({
      url:urls.getVendors+'/'+vendorId,
      data:{}
    }).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }
  output.fnDeleteVendor = function (vendorId) {
    return ajaxService.fnDeleteData({
      url:urls.getVendors+'/'+vendorId,data:{}}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }

  
}

angular
  .module('urbanApp')
  .service('vendorService', ['$http','ajaxService', vendorService]);
