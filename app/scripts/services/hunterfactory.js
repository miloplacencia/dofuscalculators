'use strict';

angular.module('DofusExpCalculator')
  .factory('HunterFactory', ['$http','CalculatorService','$filter','$q',function($http,CS,$filter,$q) {
    var hunter = {};
    var url    = 'http://dofuscalculatorsnode-milonga.rhcloud.com';

    hunter.recipes = {
      hunter      : {},
      butcher     : {},
      totals      : {},
      ingredients : {}
    };

    hunter.profession = '';

    var getIngredients = function()
    {
      return $http.get(url+'/api/hunterIngredients',{cache:true});
    };

    var getProfession = function(profession)
    {
      return $http.get(url+'/api/professions/'+profession,{cache:true});
    };

    var getRecipes = function()
    {
      var self = this;

      var promises = {
        hunter: getProfession('hunter'),
        butcher: getProfession('butcher'),
        ingredients: getIngredients()
      };

      return $q.all(promises);
    };

    var orderRecipe = function(data)
    {
      var self = hunter;
      angular.forEach(data,function(obj,i)
      {
        if(!/ghost/gi.test(obj.name))
        {
          self.recipes[obj.profession][obj.name] = {
            i18n : obj.i18n,
            ingredients: {}
          };

          angular.forEach(obj.recipe.ingredients,function(ing)
          {
            self.recipes[obj.profession][obj.name].ingredients[ing.name] = parseInt(ing.value,10);
          });
        }
      });
    };

    var orderIngredients = function(data)
    {
      var ingredients = {};
      var self = hunter;

      angular.forEach(data,function(obj)
      {
        ingredients[obj.name] = obj;
      });

      self.recipes.ingredients = ingredients;
    };

    hunter.putRecipes = function()
    {
      var self = this;

      getRecipes().then(function(d)
      {
        if(d)
        {
          var hunter = d.hunter.data;
          var butcher = d.butcher.data;
          var ingredients = d.ingredients.data;

          orderRecipe(hunter);
          orderRecipe(butcher);
          orderIngredients(ingredients)

          self.recipes.hunter = CS.removeBlank(self.recipes.hunter);
          self.recipes.butcher = CS.removeBlank(self.recipes.butcher);
          
          self.recipes.totals = angular.extend(self.recipes.totals,self.recipes.butcher);
          self.recipes.totals = angular.extend(self.recipes.totals,self.recipes.hunter);
        }
      });
    };

    hunter.addRecipe = function(recipe)
    {
      var $this = this;
      var ingredientes = this.recipes[this.profession][recipe].ingredients;
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

    hunter.addIngredient = function(ingredientes)
    {
      var self = this;
      var profession = this.profession;

      angular.forEach(ingredientes,function(quantity,name)
      {
        var ingredientCalc = self.ingredientsToCalc[name];
        var ingredientName = self.recipes.ingredients[name];

        if(!ingredientCalc && !!ingredientName)
        {
          self.ingredientsToCalc[name] = {
            quantity: parseInt(quantity,10)
          };
        }
        else if(!!ingredientCalc && !!ingredientName)
        {
          self.ingredientsToCalc[name].quantity += parseInt(ingredientes[name],10);
        }
      });
    };

    hunter.delRecipe = function(recipeName)
    {
      var deleted = this.recipesToCalc[recipeName];
      this.delIngredient(deleted);
      delete this.recipesToCalc[recipeName];
    };

    hunter.delIngredient = function(recipe)
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

    hunter.calculateQuantity = function(ingredientQuantity,ingredientName)
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

    hunter.getFinalStats = function()
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

    return hunter;
  }]);
