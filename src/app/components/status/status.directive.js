(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .directive('status', status);

  /** @ngInject */
  function status() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/status/status.html',
      controller: StatusController
    };

    return directive;

    /** @ngInject */
    function StatusController(ES_URL, $scope, StatusFactory, ElasticStatusService) {
      $scope.esUrl = ES_URL;
      $scope.getStatus = function(done) {
        ElasticStatusService.getClusterStats(function(err, data) {
          $scope.status = StatusFactory.clusterStatus = data || err;
          return done();
        });
      };
      $scope.getNodeStats = function(done) {
        ElasticStatusService.getNodeStats(function(err, data) {
          if (!err) {
            $scope.nodes = data;
          }
          return done();
        });
      };
      $scope.refreshAll = function() {
        StatusFactory.isLoading = true;
        $scope.getStatus(function() {
          $scope.getNodeStats(function() {
            StatusFactory.isLoading = false;
          });
        });
      };

      // get state info
      $scope.refreshAll();
    }
  }

})();
