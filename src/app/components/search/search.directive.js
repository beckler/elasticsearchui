(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .directive('search', search);

  /** @ngInject */
  function search() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/search/search.html',
      controller: searchController
    };

    return directive;

    /** @ngInject */
    function searchController($scope, $interval, ElasticSearchService, ViewerFactory) {
      $scope.textQuery = '';

      //setters
      $scope.setIndex = function(index) {
        $scope.selectedIndex = index;
        $scope.setType(undefined);
        registerPopups();
      };
      $scope.setType = function(type) {
        $scope.selectedType = type;
        $scope.setProperty(undefined);
        registerPopups();
      };
      $scope.setProperty = function(prop) {
        $scope.results = undefined;
        $scope.selectedProperty = prop;
      };

      //getters
      $scope.getMappings = function() {
        ElasticSearchService.getMetadata(function(err, data) {
          if (!err) {
            $scope.mappings = data.metadata.indices;
          }
        });
      };

      //deleters
      $scope.deleteIndex = function(index) {
        ElasticSearchService.deleteIndex(function(err) {
          if (!err) {
            $scope.setIndex(undefined);
            $scope.getMappings();
          }
        }, index);
      };
      $scope.deleteType = function(index, type) {
        ElasticSearchService.deleteType(function(err) {
          if (!err) {
            $scope.setType(undefined);
            $scope.getMappings();
          }
        }, index, type);
      };

      //watches
      $scope.$watch('textQuery', function(newVal, oldVal) {
        if (newVal !== oldVal && (newVal !== undefined && newVal !== "")) {
          //ugh
          var obj = ($scope.selectedProperty ? $scope.selectedProperty + ':' : '') + newVal;
          getResults($scope.selectedIndex, $scope.selectedType, obj);
        }
      });

      //functions
      function getResults(index, type, query, page) {
        //preserve state for pagination
        ViewerFactory.Query = {
          index: index,
          type: type,
          query: query,
          page: page || 0
        };

        //get results
        ElasticSearchService.fullTextSearch(function(err, data) {
          if (!err) {
            ViewerFactory.Results = data;
          }
        }, index, type, query, page);
      }

      //init
      $scope.getMappings();
    }

    function registerPopups() {
      //jQuery
      $('.item .remove').popup({ //jshint ignore:line
          on: 'click',
          inline: true,
          hoverable: true,
          position: 'bottom center'
        });
    }
  }

})();
