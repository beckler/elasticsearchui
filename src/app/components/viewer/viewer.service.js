(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .factory('ViewerFactory', ViewerFactory);

  /** @ngInject */
  function ViewerFactory() {
    return {
      Loading: false,
      Query: {},
      Results: {}
    };
  }
})();
