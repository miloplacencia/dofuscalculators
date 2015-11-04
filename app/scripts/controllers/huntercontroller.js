(function(){

'use strict';

var dofusControllers =  angular.module('DofusExpCalculator');

//HUNTER AND BUTCHER CALCULATOR
dofusControllers
	.controller('HunterController',['$scope','$routeParams',function($scope,$routeParams)
	{

	}]);

dofusControllers
	.controller('HunterCalculatorController',['$scope','$http','HunterFactory',function($scope,$http,HunterDB)
	{
		HunterDB.profession = 'Hunter';
		$scope.hunterButcher = {
			search:'',
			language: 'en',
			getRecipe: HunterDB.getRecipe,
			recipesToCalc: {},
			ingredientsToCalc: {},
			isSearched: function(recipe)
			{
				if(!!recipe)
					return recipe.toLowerCase().indexOf(this.search.toLowerCase())!==-1;
			},
			setLang: function(lang)
			{
				this.language = lang;
			},
			setQuantityIngredient: function(q,recipeQ)
			{
				return ((!!recipeQ) ? q*recipeQ : q)
			},
			addIngredient: HunterDB.addIngredient,
			addRecipe: HunterDB.addRecipe,
			delIngredient: HunterDB.delIngredient,
			delRecipe: HunterDB.delRecipe,
			calculateQuantity: HunterDB.calculateQuantity,
			getFinalStats: HunterDB.getFinalStats
		};

		$scope.hunterButcher.nameExists = function(name)
		{
			var ingredients = this.recipes.ingredients;
			var lang = hunterButcher.language;

			if(!!ingredients[name])
			{
				if(!!ingredients[name].i18n[lang])
					return ingredients[name].i18n[lang];
				else if(!ingredients[name].i18n[lang] && !!ingredients[name])
					return ingredients[name];
				else 
					return false;
			}
			else
				return false;
		};

		$scope.helper = {};
		$scope.helper.needComa = function(index,value)
		{
			var qIngredients = this.keysLength(value),
				isObject = typeof this.value === "object",
				isFinal = (isObject || index===qIngredients-1);
			
			return (!isFinal)?', ':'';
		};
		$scope.helper.keysLength = function(obj)
		{
			return Object.keys(obj).length;
		};

	}]);

})();