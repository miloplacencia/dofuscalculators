(function()
{
	'use strict';

	var dofusControllers =  angular.module('DofusExpCalculator');

//HUNTER AND BUTCHER CALCULATOR
/*dofusControllers
	.controller('IngredientsController',['$scope','IngredientsFactory',function($scope,IngDB)
{
	IngDB.profession = $scope.hunterOrButcher();
	IngDB.putRecipes();

	$scope.hunterButcher = {
		search:'',
		profession: $scope.hunterOrButcher(),
		recipes: IngDB.recipes,
		ingredients: IngDB.recipes.ingredients,
		recipesToCalc: {},
		ingredientsToCalc: {},
		isSearched: function(recipe)
		{
			return recipe.toLowerCase().indexOf(this.search.toLowerCase())!==-1
		},
		setQuantityIngredient: function(q,recipeQ)
		{
			return ((!!recipeQ) ? q*recipeQ : q)
		},
		addIngredient: IngDB.addIngredient,
		addRecipe: IngDB.addRecipe,
		delIngredient: IngDB.delIngredient,
		delRecipe: IngDB.delRecipe,
		calculateQuantity: IngDB.calculateQuantity,
		getFinalStats: IngDB.getFinalStats
	};

	$scope.helper = {
		needComa: function(index,value)
		{
			var qIngredients = this.keysLength(value),
				isObject = typeof this.value === "object",
				isFinal = (isObject || index===qIngredients-1);
			
			return (!isFinal)?', ':'';
		},
		keysLength: function(obj)
		{
			return Object.keys(obj).length;
		}
	};
}]);
*/
})();