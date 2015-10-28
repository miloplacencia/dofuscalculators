(function(){

'use strict';

var dofusControllers =  angular.module('DofusExpCalculator');

dofusControllers
	.controller('ProfessionsController',['$scope','$routeParams','CalculatorService','DbService','$rootScope',function($scope,$routeParams,CS,DB,$rootScope)
	{
		$scope.main = $rootScope.main;
		$scope.main.lang = $routeParams.lang || 'en';

		var checki18nProfession = function(pro)
		{

			if(!!DB.i18nProfessions[pro])
				return pro;
			else if(!!DB.ProfessionsI18N[pro] && !!DB.i18nProfessions[DB.ProfessionsI18N[pro]])
				return DB.ProfessionsI18N[pro];
			else 
				return false;

		};

		$scope.profession = {
			ingredientsi18n : {},
			lang			: $scope.main.lang,
			name			: checki18nProfession($routeParams.profession) || '',
			level			: ~~$routeParams.level || 100,
			exp 			: ~~$routeParams.exp || 0,
			list 			: DB.Professions,
			i18n 			: DB.i18nProfessions,
			levelInicial	: CS.levelInicial(~~$routeParams.exp || 0),
			expRestante		: CS.expRestante(~~$routeParams.exp,~~$routeParams.level)
		};

		$scope.profession.setLang = function(lang)
		{
			this.lang = lang;
		};
		$scope.profession.loadedInfo = function()
		{
			return !$scope.getWarning() && !!this.name;
		};

		$scope.getWarning = function()
		{
			if($scope.profession.level > $scope.profession.levelInicial)
				return false;
			else
				return true;
		};

		$scope.checked = function(pro)
		{
			return (checki18nProfession($scope.profession.name)===pro) ? true : false;
		};
	}]);


dofusControllers
	.controller('ResultsController',['$scope','$http','CalculatorService','DbService','Test',function($scope,$http,CS,DB,Test)
	{
		if(!$scope.getWarning())
		{
			$scope.crafts = {};
			$scope.results = {
				listaCantidades		: CS.calcularExpPorCasilla($scope.profession.expRestante),
				blocked				: CS.blockedLevel,
				useless				: CS.isUseless,
				isGathering			: CS.isGatheringTrue($scope.profession.name),
			};

			var orderedList = Test.parse($scope.profession.name);
			
			orderedList.then(function(data)
			{
				$scope.crafts 			= data.list;
				$scope.results.slots 	= data.recipes;
			});


			$scope.results.cantidadCrafts = function(casilla)
			{
				return this.listaCantidades[casilla-1];
			};

			$scope.gatheringList = DB.gathering[$scope.profession.name];

			if($scope.main.lang!=='en' && $scope.results.isGathering)
			{
				DB.getGathering($scope.profession.name,$scope.main.lang);
			}
		}
	}]);

})();
