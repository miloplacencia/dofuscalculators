(function() {
  'use strict';

  angular
    .module('dofuscalculators2')
    .factory('api', apiFactory);

  /** @ngInject */
  function apiFactory($http,$q,lodash) {
    var Ingredients = {};
    var URL         = 'http://dofuscalculatorsnode-milonga.rhcloud.com/api/';

    var q = $q.defer();

    Ingredients.getRecipe = function(recipeName,lang)
    {
      lang = (!lang) ? 'en' : lang;

      return $http.get(URL+'recipe/'+lang+'/'+recipeName,{ timeout: q.promise })
        .then(function(data)
        {
          return data.data;
        });
    };

    Ingredients.geti18nIngredients = function(ingredientName)
    {

      return $http.get(URL+'resources/'+ingredientName)
        .then(function(data)
        {
          return data.data;
        });
    };

    Ingredients.getFullRecipe = function(recipeName)
    {
      return $http.get(URL+'recipe/'+recipeName)
        .then(function(data)
        {
          return data.data;
        });
    };

    Ingredients.isIngredient = function(ingredientsObj)
    {
      var ingredients = [];
      lodash.forEach(ingredientsObj,function(ing)
      {
        ingredients.push($http.get(URL+'recipe/'+ing.name));
      });

      return $q.all(ingredients);
    };

    Ingredients.cancelRecipe = function()
    {
      q.resolve();
      q = $q.defer();
    };

    return Ingredients;
  }
})();
