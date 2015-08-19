(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .directive('viewer', viewer);

  /** @ngInject */
  function viewer() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/viewer/viewer.html',
      controller: ViewerController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ViewerController() {
    }
  }

})();
