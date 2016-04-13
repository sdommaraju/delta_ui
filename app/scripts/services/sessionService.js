'use strict';
angular
  .module('urbanApp')
  .service('Session', function () {
  this.create = function (token, userId, userRole) {
    this.token = token;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.token = null;
    this.userId = null;
    this.userRole = null;
  };
})
