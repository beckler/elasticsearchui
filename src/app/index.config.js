(function() {
  'use strict';

  angular
    .module('elasticSearchUI')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    // toastr.options.timeOut = 3000;
    // toastr.options.positionClass = 'toast-top-right';
    // toastr.options.preventDuplicates = true;
    // toastr.options.progressBar = true;
  }

})();
