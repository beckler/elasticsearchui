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
    function searchController($scope, ElasticSearchService, ViewerFactory) {
      $scope.textQuery = '';
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
      $scope.getMappings = function() {
        ElasticSearchService.getMetadata(function(err, data) {
          if (!err) {
            $scope.mappings = data.metadata.indices;
          }
        });
      };
      $scope.getResults = function(index, type, property) {
        ElasticSearchService.getUniqueValues(function(err, data) {
          if (!err) {
            $scope.results = data.aggregations[Object.keys(data.aggregations)[0]].buckets;
          }
        }, index, type, property);
      };
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
        if (newVal !== oldVal && newVal !== undefined) {
          //ugh
          var obj = {};
          obj[$scope.selectedProperty || "match_all"] = newVal;

          //set query
          ViewerFactory.Query = {
            index: $scope.selectedIndex,
            type: $scope.selectedType,
            query: obj
          };
        }
      });

      function registerPopups() {
        //jQuery
        $('.item .remove').popup({ //jshint ignore:line
          on: 'click',
          inline: true,
          hoverable: true,
          position: 'bottom center'
        });
      }
      //init
      registerPopups();
      $scope.getMappings();
    }
  }

})();
