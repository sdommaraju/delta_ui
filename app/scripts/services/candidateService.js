'use strict';

function candidateService($http, ajaxService) {
  var output  = this,
      urls    = {
        addProfile: 'http://delta.net/api/candidate',
        getCandidates: 'http://delta.net/api/candidate',
        uploadFile: 'https://delta.net/api/candidate',
        addSkills: 'https://delta.net/api/candidate',
        search: 'https://delta.net/api/candidate/search'
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
      url:urls.addProfile,
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }

  output.fnGetCandidates = function () {
    return ajaxService.fnGetData({
      url:urls.getCandidates,
      data:{}
    }).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }

  output.fnUploadResumeByFile = function (oData) {
    return ajaxService.fnPostData({
      url:urls.uploadFile+'/'+oData.id+'/uploadResume',
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }

  output.fnAddSkills = function (oData) {
    return ajaxService.fnPostData({
      url:urls.addSkills+'/'+oData.id+'/skills',
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }

  output.searchBySkills = function (oData) {
    debugger;
    return ajaxService.fnGetData({
      url:urls.search,
      data:oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }

}

angular
  .module('urbanApp')
  .service('candidateService', ['$http','ajaxService', candidateService]);
