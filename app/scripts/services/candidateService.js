'use strict';

function candidateService($http, ajaxService) {
  var output  = this,
      urls    = {
        addProfile: 'http://delta.srinutech.com/api/candidate',
        getCandidates: 'http://delta.srinutech.com/api/candidate',
        uploadFile: 'http://delta.srinutech.com/api/candidate',
        addSkills: 'http://delta.srinutech.com/api/candidate',
        search: 'http://delta.srinutech.com/api/candidate/search',
        candidateJobs: 'http://delta.srinutech.com/api/candidate/',
        allJobs: 'http://delta.srinutech.com/api/jobs',
        assignJob: 'http://delta.srinutech.com/api/candidate/'
      };

  output.fnGetData = function (oData) {
      return $http.get({url:oData.url}).then(function(response){
        return response.data;
      }, function(error){
        return error;
      });
  };

  output.fnAddProfile = function (oData) {
    return ajaxService.fnPostData({
      url:urls.addProfile,
      data:oData}).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  };

  output.fnEditProfile = function (oData) {
    return ajaxService.fnPutData({
      url:urls.addProfile,
      data:oData}).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  };

  output.fnGetCandidates = function () {
    return ajaxService.fnGetData({
      url:urls.getCandidates,
      data:{}
    }).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  };

  output.fnUploadResumeByFile = function (oData,resume) {
    debugger;
    return ajaxService.fnPostDataFile({
      url:urls.uploadFile+'/'+oData.id+'/uploadResume',
      data:resume}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  };

  output.fnAddSkills = function (oData) {
    return ajaxService.fnPostData({
      url:urls.addSkills+'/'+oData.id+'/skills',
      data:oData}).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  };

  output.fnFetchAllSkills = function(oData) {
    return ajaxService.fnGetData({
      url:urls.addSkills+'/'+oData.id+'/skills',
      data : oData}).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  };

  output.searchBySkills = function (oData) {
    return ajaxService.fnGetData({
      url:urls.search,
      data : {skills:oData.skills}}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  };

  output.fnGetCandidateJobs = function (oData) {
    return ajaxService.fnGetData({
      url:urls.candidateJobs+""+oData.id+"/jobs",
      data : oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  };

  output.fnGetAllJobs = function (oData) {
    return ajaxService.fnGetData({
      url:urls.allJobs,
      data : oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  };

  output.fnAssignJobToCandidate = function (oData) {
    return ajaxService.fnPostData({
      url:urls.assignJob+""+oData.id+"/jobs/"+oData.jobId,
      data : oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  };

  output.fnChangeJobStage = function (oData) {
    return ajaxService.fnGetData({
      url:urls.search,
      data : oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  };

  //https://delta.srinutech.com/api/candidate/{candidate_id}/jobs/{job_id}/change-stage

  output.fnChangeStage = function (oData) {
    return ajaxService.fnPostData({
      url:urls.assignJob+""+oData.candidate_id+"/jobs/"+oData.job_id+"/change-stage",
      data : oData}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  };

}

angular
  .module('urbanApp')
  .service('candidateService', ['$http','ajaxService', candidateService]);
