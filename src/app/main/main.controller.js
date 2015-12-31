(function() {
  'use strict';

  angular
    .module('dofuscalculators2')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(api,lodash)
  {
    var vm = this;
		var URL = 'http://dofuscalculatorsnode-milonga.rhcloud.com/api/recipe/';

		vm.lang = 'es';
		vm.changeLang = function(lang)
		{
			vm.lang = lang;
		};
		vm.isLang = function(lang)
		{
			return lang===vm.lang;
		};
    vm.ingredients = {};
		vm.ingredients.recipeSearch = '';
		vm.ingredients.tempRecipes	= [];
		vm.ingredients.selectedRecipes = [];
		vm.ingredients.listIngredients = {};
		vm.ingredients.tempIngredients = [];
		vm.ingredients.closeSelect = true;
		vm.ingredients.ingredientsi18n = {};

		var removeIngredients, recalculateIngredients, searchSubrecipes;

		vm.ingredients.onRecipeSearch = function()
		{
			api.cancelRecipe();
			vm.ingredients.closeSelect = false;
			api.getRecipe(vm.ingredients.recipeSearch,vm.lang).then(function(data)
			{
				if(data)
					vm.ingredients.tempRecipes = data;
			});
		};

		vm.ingredients.onRecipeSelect = function(recipe)
		{
			vm.ingredients.closeSelect = true;
			recipe.quantity	= 1;
			recipe.linkedRecipes			= [];
			recipe.linkedIngredients 	= [];
			recipe.checked	= false;

			var findRecipe	= lodash.find(vm.ingredients.selectedRecipes,{ 'name' : recipe.name });

			if(!findRecipe)
			{
				vm.ingredients.selectedRecipes.push(recipe);
			}
			else
			{
				findRecipe.quantity += 1;
			}
			searchSubrecipes(recipe);
		};

		removeIngredients = function(recipe)
		{
			var ingredients = (lodash.isEmpty(recipe.linkedIngredients)) ? recipe.recipe.ingredients : recipe.linkedIngredients;

			lodash.forEach(ingredients,function(ingredient)
			{
				vm.ingredients.listIngredients[ingredient.name] -= ingredient.value * recipe.quantity;
				if(vm.ingredients.listIngredients[ingredient.name]<=0)
					delete vm.ingredients.listIngredients[ingredient.name];
			})
		};

		recalculateIngredients = function()
		{
			vm.ingredients.listIngredients = {};

			lodash.forEach(vm.ingredients.selectedRecipes,function(recipe)
			{
				var ingredients = (lodash.isEmpty(recipe.linkedIngredients)) ? recipe.recipe.ingredients : recipe.linkedIngredients;

				lodash.forEach(ingredients,function(ingredient)
				{
					if(!vm.ingredients.listIngredients[ingredient.name])
					{
						vm.ingredients.listIngredients[ingredient.name] = ingredient.value * recipe.quantity;
					}
					else
					{
						vm.ingredients.listIngredients[ingredient.name] += ingredient.value * recipe.quantity;
					}
				});
			});
		};

		searchSubrecipes = function(recipe,originalRecipe)
		{
			if(lodash.isObject(originalRecipe))
			{
				recipe.checked = true;
			}

			var mainRecipe = originalRecipe || recipe;

			api.isIngredient(recipe.recipe.ingredients).then(function(recetas)
			{
				lodash.forEach(recetas,function(receta)
				{
					var ingredient = receta.config.url.replace(URL,'');

					var I = lodash.find(recipe.recipe.ingredients,{ 'name' : ingredient });

					if(!lodash.isEmpty(receta.data))
					{
						mainRecipe.linkedRecipes.push(receta.data);
					}
					else {
						var repeatedIngredient = lodash.find(mainRecipe.linkedIngredients,{'name' : I.name });

						var hasIngredient = vm.ingredients.listIngredients[I.name];

						var hasi18n = vm.ingredients.ingredientsi18n[I.name];

						if(repeatedIngredient)
						{
							lodash.find(mainRecipe.linkedIngredients,{'name' : I.name }).value += I.value;
						}
						else {
							mainRecipe.linkedIngredients.push(I);
						}

						if(hasIngredient){
							vm.ingredients.listIngredients[I.name] += I.value;
						}
						else {
							vm.ingredients.ingredientsi18n[I.name] = {};
							vm.ingredients.ingredientsi18n[I.name].en = I.name;
							vm.ingredients.listIngredients[I.name] = I.value;
						}

						if(!hasi18n)
						{
							api.geti18nIngredients(I.name).then(function(data)
							{
								vm.ingredients.ingredientsi18n[I.name] = data.i18n;
							});
						}
					}


				});

				lodash.forEach(mainRecipe.linkedRecipes,function(receta)
				{
					if(!receta.checked)
						searchSubrecipes(receta,mainRecipe);
				});
			});
		};

		vm.ingredients.onQuantityChange = recalculateIngredients;

		vm.ingredients.deleteRecipe = function(recipe)
		{
			lodash.pull(vm.ingredients.selectedRecipes,recipe);
			removeIngredients(recipe);
		};

  }
})();
