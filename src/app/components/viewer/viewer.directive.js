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
    function ViewerController($scope, ViewerFactory) {
      $scope.$watch(function() { return ViewerFactory.Query; }, function(newVal, oldVal) {
        $scope.query = JSON.stringify(newVal);
      }, true);
      $scope.$watch(function() { return ViewerFactory.Results; }, function(newVal, oldVal) {
        $scope.results = JSON.stringify(newVal);
      }, true);
    }
  }

})();
