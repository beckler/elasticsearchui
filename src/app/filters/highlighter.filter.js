(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .filter('highlight', highlight)
    .filter('highlightruncate', highlightTruncate);

  /** @ngInject */
  function highlightTruncate() {
    return function(input, query) {
      input = escapeString(input);
      query = escapeString(query);
      var indexes = getAllIndexes(input.toLowerCase(), query.toLowerCase());
      if (indexes.length > 0) {
        var displayStrings = [];
        for (var i = 0; i < indexes.length; i++) {
          displayStrings.push(
            input.slice(indexes[i] - query.length, indexes[i]) +
            '<span class="highlight">' + input.slice(indexes[i], indexes[i] + query.length) + '</span>' +
            input.slice(indexes[i] + query.length, indexes[i] + query.length + 50));
        }
        return displayStrings;
      } else {
        return [input];
      }
    };
  }

  function highlight() {
    return function(input, query) {
      input = escapeString(input);
      query = escapeString(query);
      if (input.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        return input.split(query).join('<span class="highlight">' + query + '</span>');
      } else {
        return input;
      }
    };
  }

  function getAllIndexes(str, val) {
    var indexes = [], i = -1;
    while ((i = str.indexOf(val, i + 1)) !== -1) {
      indexes.push(i);
    }
    return indexes;
  }

  function escapeString(input) {
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    return String(input).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
  }
})();
