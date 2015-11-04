(function()
{
	'use strict';

	var dofusControllers =  angular.module('DofusExpCalculator');

dofusControllers
	.controller('IngredientsController',['$scope','IngredientsFactory',function($scope,IngDB)
	{
		$scope.ingredients = {};

		$scope.ingredients.recipeSearch = '';
		$scope.ingredients.getRecipe 	= IngDB.getRecipe;
		$scope.ingredients.tempRecipes	= [];
		$scope.ingredients.selectedRecipes = [];
		$scope.ingredients.closeSelect = true;
		
		$scope.ingredients.onRecipeSearch = function()
		{
			var $this = this;
			IngDB.cancelRecipe();
			$this.closeSelect = false;
			$this.getRecipe($this.recipeSearch,'en').then(function(data)
			{
				if(data)
					$this.tempRecipes = data.data;
			},function(err)
			{
				console.log(err);
			});
		};

		$scope.ingredients.onRecipeSelect = function(recipe)
		{
			var $this = this;
			$this.closeSelect = true;
			$this.selectedRecipes.push(recipe);
		};

	}]);

})();