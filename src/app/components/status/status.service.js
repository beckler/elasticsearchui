(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .factory('StatusFactory', StatusFactory);

  /** @ngInject */
  function StatusFactory() {
    return {
      isLoading: {},
      clusterStatus: {}
    };
  }
})();
