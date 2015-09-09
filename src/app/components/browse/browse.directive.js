(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .directive('browse', browse);

  /** @ngInject */
  function browse() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/browse/browse.html',
      controller: BrowseController
    };

    return directive;

    /** @ngInject */
    function BrowseController() {
    }
  }

})();
