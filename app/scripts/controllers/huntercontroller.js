(function(){

'use strict';

var dofusControllers =  angular.module('DofusExpCalculator');

//HUNTER AND BUTCHER CALCULATOR
dofusControllers
	.controller('HunterController',['$scope','$routeParams','recipes',function($scope,$routeParams,recipes)
	{
		var returnCalculator = function()
		{
			return $routeParams.calculator;
		};

		$scope.isButcher = returnCalculator()==='butcher' || returnCalculator()==='carnicero';
		$scope.isHunter = returnCalculator()==='hunter' || returnCalculator()==='cazador';
		$scope.isHunterButcher = !returnCalculator() || returnCalculator()==='hunter_butcher' || returnCalculator()==='cazador_carnicero';
		
		$scope.hunterOrButcher = function()
		{
			var isWhichOfThose = returnCalculator();
			var isTotals = isWhichOfThose.split('_');
			return (isTotals.length===2)?'totals':isTotals[0];
		}
	}]);

dofusControllers
	.controller('HunterCalculatorController',['$scope','HunterFactory',function($scope,HunterDB)
	{
		HunterDB.profession = $scope.hunterOrButcher();

		$scope.hunterButcher = {
			search:'',
			language: 'en',
			profession: $scope.hunterOrButcher(),
			recipes: HunterDB.recipes,
			recipesToCalc: {},
			ingredientsToCalc: {},
			isSearched: function(recipe)
			{
				if(!!recipe)
					return recipe.toLowerCase().indexOf(this.search.toLowerCase())!==-1
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