(function() {
  'use strict';

  angular
    .module('dofuscalculators2')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$rootScope) {

    $log.debug('runBlock end');
    var temp;
    temp = $rootScope.$on("$stateChangeError", $log.log.bind(console));
  }

})();
