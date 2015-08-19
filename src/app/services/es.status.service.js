(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .factory('ElasticStatusService', ElasticStatusService);

  /** @ngInject */
  function ElasticStatusService(ES_URL, $http) {
    return {
      getClusterHealth: function(done) {
        return getApi(done, '/_cluster/health');
      },
      getClusterStats: function(done) {
        return getApi(done, '/_cluster/stats');
      },
      getClusterState: function(done) {
        return getApi(done, '/_cluster/state');
      },
      getClusterMetadata: function(done) {
        return getApi(done, '/_cluster/state/metadata');
      },
      getNodeStats: function(done) {
        return getApi(done, '/_nodes/stats');
      },
      getAllIndexStats: function(done) {
        return getApi(done, '/_all/_stats');
      },
      getIndexStats: function(done, index){
        return getApi(done, '/' + index + '/_stats');
      }
    };

    function getApi(done, path) {
      $http.get(ES_URL + path)
      .success(function(data){
        return done(null, data);
      })
      .error(function(data){
        return done(data || 'Unable to connect to ElasticSearch instance.');
      });
    }
  }
})();
