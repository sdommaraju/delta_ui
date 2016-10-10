'use strict';

function usersService($http, ajaxService) {
  var output  = this,
      urls    = {
        addUser: ajaxService.config.api_url+'users',
        getUsers: ajaxService.config.api_url+'users',
        getRoles: ajaxService.config.api_url+'user/roles',
        getGroups: ajaxService.config.api_url+'user/groups',

      };

  output.fnGetData = function (oData) {
      return $http.get({url:oData.url}).then(function(response){
        return response.data;
      }, function(error){
        return error;
      });
  }

  output.fnAddUser = function (oData) {
    return ajaxService.fnPostData({
      url:urls.addUser,
      data:oData}).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }

  output.fnGetUsers = function () {
    return ajaxService.fnGetData({
      url:urls.getUsers,
      data:{}
    }).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }
  output.fnGetUserDetails = function (userId) {
    return ajaxService.fnGetData({
      url:urls.getUsers+'/'+userId,
      data:{}
    }).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }
  output.fnDeleteUser = function (userId) {
    return ajaxService.fnDeleteData({
      url:urls.getUsers+'/'+userId,data:{}}).then(function(response){
      return response;
    }, function(error){
      return error;
    });
  }
  output.fnGetRoles = function () {
    return ajaxService.fnGetData({
      url:urls.getRoles,
      data:{}
    }).then(function(response){
      return response.data;
    }, function(error){
      return error;
    });
  }
  output.fnGetGroups = function () {
    return ajaxService.fnGetData({
      url:urls.getGroups,
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
  .service('usersService', ['$http','ajaxService', usersService]);
