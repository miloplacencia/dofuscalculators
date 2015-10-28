(function()
{
  'use strict';

  angular.module('DofusExpCalculator')
  .factory('IngredientsFactory', ['$http','CalculatorService','$filter',function($http,CS,$filter) {
    /*
    var ingredients = {};
    var url    = '/JSON/';

    ingredients.recipes = {
      hunter:   {},
      butcher:  {},
      totals: {},
      ingredients: {}
    };

    ingredients.profession = '';

    ingredients.orderTotals = function()
    {
      var $this = this;
      var butcher = this.recipes.butcher;
      var hunter = this.recipes.hunter;
      var ingredients = this.recipes.ingredients;
      var totals = {};

      angular.forEach(butcher,function(ingredientObj,recipeName)
      {
        angular.forEach(ingredientObj,function(quantity,name)
        {
          if(!ingredients[name] && !!hunter[name])
          {
            angular.forEach(hunter[name],function(q,n)
            {
              if(name === n)
              {
                ingredientObj[name] += q;
              }
              else
              {
                ingredientObj[n] = q;
              }
            });

            totals[recipeName] = ingredientObj;
          }
        });
      });
      this.recipes.totals = totals;
      console.log($filter('json')(totals));
    };
    
    ingredients.putRecipes = function()
    {
      var $this = this;
      return $http.get(url+'hunter_in_butcher.json',{
        cache:true
      }).success(function(data)
      {
        angular.forEach(data,function(obj,professionName)
        {
          $this.recipes[professionName] = CS.removeBlank(obj);
          //$this.orderTotals();
        });
      });
    };

    ingredients.addRecipe = function(recipe)
    {
      var $this = this;
      var ingredientes = this.recipes[this.profession][recipe];
      var recipeNew = {
        ingredients: ingredientes,
        quantity: 1
      };
      
      if(!this.recipesToCalc[recipe])
      {
        this.recipesToCalc[recipe] = recipeNew;
        this.addIngredient(ingredientes);
      }
      else
      {
        this.recipesToCalc[recipe].quantity++;
      }
      this.search='';
    };

    ingredients.addIngredient = function(ingredientes)
    {
      var $this = this;
      var profession = this.profession;

      angular.forEach(ingredientes,function(quantity,name)
      {
        var ingredientCalc = $this.ingredientsToCalc[name];
        var ingredientName = $this.recipes.ingredients[name];

        if(!ingredientCalc && !!ingredientName)
        {
          $this.ingredientsToCalc[name] = {
            quantity: parseInt(quantity,10)
          };
        }
        else if(!!ingredientCalc && !!ingredientName)
        {
          $this.ingredientsToCalc[name].quantity += parseInt(ingredientes[name],10);
        }
      });
    };

    ingredients.delRecipe = function(recipeName)
    {
      var deleted = this.recipesToCalc[recipeName];
      this.delIngredient(deleted);
      delete this.recipesToCalc[recipeName];
    };

    ingredients.delIngredient = function(recipe)
    {
      var $this = this;
      var ingredients = recipe.ingredients;
      angular.forEach(ingredients,function(q,n)
      {
        var ingredientCalc = $this.ingredientsToCalc[n];
        var ingredientName = $this.recipes.ingredients[n];
        
        if(!!ingredientCalc && !!ingredientName)
          $this.ingredientsToCalc[n].quantity -= q;
        
        if(!!ingredientCalc && ingredientCalc.quantity==0)
          delete $this.ingredientsToCalc[n];
      });
    };

    //recipes = { profession: { recipe : { ingredient:quantity } } }
    //ingredients = { ingredient: { price: value, pods:quantity } }
    //recipesToCalc = { name: { ingredients: , quantity: } }
    //ingredientsToCalc = { name: { quantity: , totalQuantity: , totalPrice: } };
    //deleted = [{ingredients:,name:,quantity:}]

    ingredients.calculateQuantity = function(ingredientQuantity,ingredientName)
    {
      var recipes = this.recipesToCalc;
      var Q = 0;
      var P = 0;
      angular.forEach(recipes,function(recipeObj,recipeName)
      {
        var recipeQuantity = recipeObj.quantity || 1;
        if(!!recipeObj.ingredients[ingredientName])
        {
          Q += recipeObj.ingredients[ingredientName] * recipeQuantity;
        }
      });
      
      this.ingredientsToCalc[ingredientName].totalQuantity = Q;
      this.ingredientsToCalc[ingredientName].totalPrice = this.recipes.ingredients[ingredientName].price * Q;
      this.ingredientsToCalc[ingredientName].totalPods = this.recipes.ingredients[ingredientName].pods * Q;

      return this.ingredientsToCalc[ingredientName];
    };

    ingredients.getFinalStats = function()
    {
      var ingredients = this.ingredientsToCalc;
      var totalPrice = 0, totalPods = 0;
      
      angular.forEach(ingredients,function(val,i)
      {
        totalPrice += val.totalPrice;
        totalPods += val.totalPods;
      });

      return { price: totalPrice, pods: totalPods };
    };

    return ingredients;
  */
  }]);

})();
