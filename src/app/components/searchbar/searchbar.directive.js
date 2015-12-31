(function() {
  'use strict';

  angular
    .module('dofuscalculators2')
    .directive('searchBar', searchBarDirective);

  /*
  var searchBarDirective, searchBarController;

  searchBarDirective = function()
  {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/searchbar/searchbar.html',
      scope: {
        ingredients: '='
      },
      controller: searchBarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  };

  searchBarController = function()
  {
    var vm = this;
    console.log('test directive controller');
  };
 */

/** @ngInject */
function searchBarDirective($window,$log) {
  var directive = {
    restrict: 'E',
    templateUrl: 'app/components/searchbar/searchbar.html',
    scope: {
        ingredients: '=',
        lang: '='
    },
    controllerAs: 'vm',
    bindToController: true
  };

  directive.controller = searchBarController;
  directive.compile = function(element,attr)
  {
    /*
    LA IDEA ES SIMPLE: CUANDO SE HACE CLICK AFUERA DE LA LISTA DE RECETAS, HACER DESAPARECER LA LISTA
    */
    return function($scope,e,a)
    {
      $log.log($scope,e,a,attr,$window);
    };
  };

  return directive;

  /** @ngInject */
  function searchBarController() {
    //var vm = this;
  }
}

})();
