'use strict';

angular.module('DofusExpCalculator')
  .factory('IngredientsFactory', ['$http','CalculatorService','$filter','$q','$rootScope',function($http,CS,$filter,$q,$rootScope) 
  {
    var Ingredients = {};
    var URL         = 'http://dofuscalculatorsnode-milonga.rhcloud.com/api/';

    var q = $q.defer();

    Ingredients.getRecipe = function(recipeName,lang)
    {
      lang = (!!lang) ? lang : 'en';

      return $http.get(URL+'recipe/'+lang+'/'+recipeName,{ timeout: q.promise })
        .then(function(data)
        {
          return data;
        });
    };

    Ingredients.cancelRecipe = function()
    {
      q.resolve();
      q = $q.defer();
    };

    return Ingredients;
  }]);