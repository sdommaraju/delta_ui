'use strict';

function candidateService($http, ajaxService) {
  var output  = this,
      urls    = {
        addProfile: ajaxService.config.api_url+'candidate',
        getCandidates: ajaxService.config.api_url+'candidate',
        uploadFile: ajaxService.config.api_url+'candidate',
        addSkills: ajaxService.config.api_url+'candidate',
        search: ajaxService.config.api_url+'candidate/search',
        candidateJobs: ajaxService.config.api_url+'candidate/',
        allJobs: ajaxService.config.api_url+'jobs',
        assignJob: ajaxService.config.api_url+'candidate/'
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
  output.fnGetCandidateProfile = function (oData) {
    return ajaxService.fnGetData({
      url:urls.getCandidates+'/'+oData.id,
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
      return response.data;
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
      data : {skills:oData.skills,state:oData.state,city:oData.city,zip:oData.zip,pay_range_min:oData.pay_range_min,pay_range_max:oData.pay_range_max}}).then(function(response){
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
output.fnGetCandidateJobsHistory = function (oData) {
    return ajaxService.fnGetData({
      url:urls.candidateJobs+""+oData.id+"/stage-history",
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
