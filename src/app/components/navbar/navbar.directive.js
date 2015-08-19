(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      scope: true,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($scope, StatusFactory) {
      $scope.$watch(function() { return StatusFactory.isLoading; }, function(newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.isLoading = newVal;
        }
      });
      $scope.$watch(function() { return StatusFactory.clusterStatus; }, function(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (!newVal || newVal.error) {
            $scope.status = "red";
          } else {
            $scope.status = newVal.status;
          }
        }
      });

      // jQuery

      $('.ui.menu .item').tab(); //jshint ignore:line
      $('.menu .status').popup({ //jshint ignore:line
        on: 'click',
        inline: true,
        hoverable: true,
        position: 'bottom right'
      });
    }
  }

})();
