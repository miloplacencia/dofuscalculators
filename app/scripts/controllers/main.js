(function(){

'use strict';

var dofusControllers =  angular.module('DofusExpCalculator');

dofusControllers
	.controller('MainController',['$scope','$routeParams','$location',function($scope,$routeParams,$location)
{
	$scope.isProfession = function()
	{
		return $location.path().indexOf('profession')!==-1;
	};
}]);

dofusControllers
	.controller('ProfessionsController',['$scope','$routeParams','CalculatorService','DbService',function($scope,$routeParams,CalculatorService,DbService)
{
	var CS = CalculatorService,
		DB = DbService;

	$scope.getWarning = function()
	{
		if($scope.profession.level > $scope.profession.levelInicial)
			return false;
		else
			return true;
	};

	$scope.checked = function(pro)
	{
		return ($scope.profession.name===pro) ? true : false;
	};

	$scope.profession = {
		name	: $routeParams.profession,
		level 	: parseInt($routeParams.level) || 100,
		exp 	: parseInt($routeParams.exp) || 0,
		list: DB.Professions,
		loadedInfo: function()
		{
			return !$scope.getWarning() && !!this.name;
		}
	};

	$scope.profession.levelInicial = CS.levelInicial($scope.profession.exp);
	$scope.profession.expRestante = CS.expRestante($scope.profession.exp,$scope.profession.level);

	
}]);


dofusControllers
	.controller('ResultsController',['$scope','$http','CalculatorService','DbService','Crafts',function($scope,$http,CS,DB,Crafts)
{
	var profession = $scope.profession;

	if(!$scope.getWarning())
	{
		$scope.gatheringList = DB.gathering[$scope.profession.name];

		var listaCantidades = CS.calcularExpPorCasilla($scope.profession.expRestante);
		var cantidadCrafts = function(casilla)
		{
			return listaCantidades[casilla-1];
		};

		$scope.results = {
			listaCantidades: listaCantidades,
			cantidadCrafts: cantidadCrafts,

			blocked: CS.blockedLevel,
			useless: CS.isUseless,
			isGathering: CS.isGatheringTrue($scope.profession.name),
			slots: {}
		};

		var crafts = Crafts.get($scope.profession.name);
		crafts.success(function(data)
		{
			$scope.crafts = Crafts.list;
			$scope.results.slots = Crafts.recipes;
		});
	}

}]);


//HUNTER AND BUTCHER CALCULATOR
dofusControllers
	.controller('HunterController',['$scope','$routeParams',function($scope,$routeParams)
{
	$scope.returnCalculator = function()
	{
		return $routeParams.calculator;
	};

	$scope.isButcher = $scope.returnCalculator()==='butcher';
	$scope.isHunter = $scope.returnCalculator()==='hunter';
	$scope.isHunterButcher = !$scope.returnCalculator() || $scope.returnCalculator()==='hunter_butcher';
	
	$scope.hunterOrButcher = function()
	{
		var isWhichOfThose = $scope.returnCalculator();
		var isTotals = isWhichOfThose.split('_');
		return (isTotals.length===2)?'totals':isTotals[0];
	}

}]);

dofusControllers
	.controller('HunterCalculatorController',['$scope','HunterFactory',function($scope,HunterDB)
{
	HunterDB.profession = $scope.hunterOrButcher();
	HunterDB.putRecipes();

	$scope.hunterButcher = {
		search:'',
		profession: $scope.hunterOrButcher(),
		recipes: HunterDB.recipes,
		ingredients: HunterDB.recipes.ingredients,
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
		addIngredient: HunterDB.addIngredient,
		addRecipe: HunterDB.addRecipe,
		delIngredient: HunterDB.delIngredient,
		delRecipe: HunterDB.delRecipe,
		calculateQuantity: HunterDB.calculateQuantity,
		getFinalStats: HunterDB.getFinalStats
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


})();