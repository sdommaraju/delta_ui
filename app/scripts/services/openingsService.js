'use strict';

function openingsService($http, ajaxService) {
  var output  = this,
      urls    = {
        addOpening: ajaxService.config.api_url+'jobs',
        getOpenings: ajaxService.config.api_url+'jobs',
        getOpeningCandidates: ajaxService.config.api_url+'jobs',
        getCompanies: ajaxService.config.api_url+'companies',

      };

  output.fnGetData = function (oData) {
      return $http.get({url:oData.url}).then(function(response){
        return response.data;
      }, function(error){
        return error;
      });
  }

  output.fnAddOpening = function (oData) {
    return ajaxService.fnPostData({
      url:urls.addOpening,
      data:oData}).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }

  output.fnGetOpenings = function () {
    return ajaxService.fnGetData({
      url:urls.getOpenings,
      data:{}
    }).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }
  output.fnGetOpeningCandidates = function (openingId) {
    return ajaxService.fnGetData({
      url:urls.getOpeningCandidates+'/'+openingId+'/candidates',
      data:{}
    }).then(function(response){
      return response.data;
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
  output.fnUploadResumeByFile = function (oData,resume) {
    debugger;
    return ajaxService.fnPostDataFile({
      url:urls.uploadFile+'/'+oData.id+'/uploadResume',
      data:resume}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }

  output.fnAddSkills = function (oData) {
    return ajaxService.fnPostData({
      url:urls.addSkills+'/'+oData.id+'/skills',
      data:oData}).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }
  output.fnFetchAllSkills = function(oData) {
    return ajaxService.fnGetData({
      url:urls.addSkills+'/'+oData.id+'/skills',
      data : oData}).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }
  output.searchBySkills = function (oData) {
    return ajaxService.fnGetData({
      url:urls.search,
      data : {skills:oData.skills}}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }

}

angular
  .module('urbanApp')
  .service('openingsService', ['$http','ajaxService', openingsService]);
