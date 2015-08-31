(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .factory('ElasticSearchService', ElasticSearchService);

  /** @ngInject */
  function ElasticSearchService(ES_URL, $http) {
    return {
      ///get methods
      getMetadata: function(done) {
        return getApi(done, '/_cluster/state/metadata');
      },
      getAllMappings: function(done) {
        return getApi(done, '/_all/_mapping');
      },
      getUniqueValues: function(done, index, type, property, resultSize) {
        // antcipate undefined
        index = index ? '/' + index : '';
        type = type ? '/' + type : '';

        // define params
        var params = {
          "search_type": "count"
        };

        // define body
        var body = {
          aggs: {
            properties: {
              terms: {
                field: property,
                size: resultSize || 0,
                order : { "_term" : "desc" }
              }
            }
          }
        };

        //make query
        return postApi(done, index + type + '/_search', body, params);
      },

      ///search methods
      fullTextSearch: function(done, index, type, query, page) {
        // add '/' if defined
        index = index ? '/' + index : '';
        type = type ? '/' + type : '';

        // define params
        var params = {
          q: query,
          size: 50,
          from: (page || 0) * 50,
          "query_cache": true,
        };
        // make query
        return getApi(done, index + type + '/_search', params);
      },

      // delete methods
      deleteIndex: function(done, index) {
        return deleteApi(done, '/' + index);
      },
      deleteType: function(done, index, type) {
        return deleteApi(done, '/' + index + '/' + type);
      }
    };

    /// Raw API calls
    function getApi(done, path, params) {
      return apiCall(done, 'GET', ES_URL + path, null, params);
    }
    function postApi(done, path, body, params) {
      return apiCall(done, 'POST', ES_URL + path, body, params);
    }
    function deleteApi(done, path) {
      return apiCall(done, 'DELETE', ES_URL + path);
    }
    function apiCall(done, verb, path, body, params, headers) {
      $http({
        url: path,
        method: verb,
        data: body,
        params: params,
        headers: headers
      })
      .success(function(data) {
        return done(null, data);
      })
      .error(function(err) {
        return done(err.error || 'Unable to connect.');
      });
    }

  }
})();
