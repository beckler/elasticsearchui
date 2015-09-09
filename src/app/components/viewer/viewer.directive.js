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
        if (newVal && newVal !== oldVal)
        {
          $scope.queryTerm = newVal.text;
          $scope.query = JSON.stringify(newVal);
        }
      }, true);
      $scope.$watch(function() { return ViewerFactory.Results; }, function(newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.resultTime = newVal.took;
          $scope.timedOut = newVal.timed_out;
          $scope.results = newVal.hits;
        }
      }, true);
    }
  }

})();
