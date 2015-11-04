(function() {
  'use strict';

  angular
    .module('dofuscalculators2')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope)
  {
    $scope.ingredients = {};
    $scope.ingredients.search = 'TEST';
  }
})();
