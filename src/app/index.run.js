(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope) {
    $rootScope.Utils = {
      keys: Object.keys
    };
    $log.debug('runBlock end');
  }
})();
