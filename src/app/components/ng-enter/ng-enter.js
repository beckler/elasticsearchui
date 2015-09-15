(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .directive('ngEnter', ngEnter);

  /** @ngInject */
  function ngEnter() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if (event.which === 13) { //enter key
          scope.$apply(function() {
            scope.$eval(attrs.ngEnter, {'event': event});
          });
        }
      });
    };
  }
})();
