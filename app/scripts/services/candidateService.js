'use strict';

function candidateService($http, ajaxService) {
  var output  = this,
      urls    = {
        addProfile: 'http://delta.srinutech.com/api/candidate',
        getCandidates: 'http://delta.srinutech.com/api/candidate',
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

}

angular
  .module('urbanApp')
  .service('candidateService', ['$http','ajaxService', candidateService]);
