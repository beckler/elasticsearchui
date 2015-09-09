(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .filter('capitalize', capitalize);

  /** @ngInject */
  function capitalize() {
    return function(input) {
      if (input !== null) {
        input = input.toLowerCase();
      }
      return input.substring(0,1).toUpperCase() + input.substring(1);
    };
  }
})();
