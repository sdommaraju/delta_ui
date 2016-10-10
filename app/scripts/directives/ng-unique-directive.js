'use strict';

/*
 * chosen - chosen select directive alternative to ui-jq
 */

function ngUnique(AuthService) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {

      element.bind('blur', function (e) {
        if (!ctrl  || !element.val()) return;
        var keyProperty = attrs.ngUnique;
        var currentValue = element.val();

        AuthService.checkUniqueValue(currentValue,keyProperty)
          .then(function (unique) {
            //Ensure value that being checked hasn't changed
            //since the Ajax call was made
            if (currentValue == element.val()) {
              ctrl.$setValidity('unique', unique);
              scope.$broadcast('show-errors-check-validity');
            }
          });
      });
    }
  }
}

angular.module('urbanApp').directive('ngUnique',ngUnique);
