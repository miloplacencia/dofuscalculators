(function()
{
	'use strict';

	var dofusDirectives = angular.module('DofusExpCalculator');

	var lista_professiones = ['DbService',function(DB)
	{
		return {
			restrict:'E',
			scope: {
				profession: '='
			},
			transclude: true,
			template: '<div ng-transclude></div>',
			controller: ['$scope',function($scope)
			{
				$scope.returnLang = (function($scope)
				{
					return $scope.$parent.main.lang;
				})($scope);

				var root_name = (function($scope)
				{
					return ($scope.returnLang==='es')?'calculadora_oficios':'professions_calculator';
				})($scope);

				var pro_name = function(pro)
				{
					return DB.i18nProfessions[pro][$scope.returnLang].replace(/\s+/ig,'-');
				};

				$scope.linki18n = function(pro)
				{
					return $scope.returnLang+'/'+root_name+'/'+pro_name(pro)+'/'+$scope.profession.exp+'/'+$scope.profession.level;
				};

				$scope.checked = function(pro)
				{
					return ($scope.profession.name===pro) ? true : false;
				};
			}]
		};
	}];
	dofusDirectives.directive('profesionesLista',lista_professiones);

	dofusDirectives.directive('profesion', ['$location',function($location)
	{
		// Runs during compile
		return {
			controller: ['$scope',function($scope)
			{
				$scope.linki18n = $scope.$parent.$parent.linki18n;
				$scope.returnLang = $scope.$parent.$parent.returnLang;
				//console.log($scope);
			}],
			require: '^profesionesLista',
			restrict: 'E',
			template: [
				'<div title="{{pro}}" class="profession profession_{{::pro.toLowerCase()}}" ng-class="{check:checked(pro)}">',
				'<a href="/{{ linki18n(pro) }}/" rel="Profession{{::pro}}">',
				'<span id="icon-{{ ::pro.toLowerCase() }}">',
				'<span class="visuallyhidden" ng-if="returnLang===\'en\'">Calculate {{::pro.replace("-"," ")}} Profession</span>',
				'<span class="visuallyhidden" ng-if="returnLang===\'es\'">Calcular para el Oficio {{::profession.i18n[pro].es}}</span>',
				'<span class="icon-{{::pro | lowercase}}"></span>',
				'</span></a></div>'
			].join(''),
			replace: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, $e, attrs)
			{
				$e.find('a').on('click',function(e)
				{
					e.preventDefault();
					var URL = '/'+$scope.linki18n($scope.pro);
					$location.path(URL);
					$scope.$root.$digest();
				});
			}
		};
	}]);

	dofusDirectives.directive('errorMsg',[function()
	{
		return {
			restrict:'E',
			scope: {
				warning: '=warning',
				profession: '='
			},
			templateUrl:'/views/templates/error.html'
		};
	}]);

	dofusDirectives.directive('showLevel',[function()
	{
		return {
			restrict:'E',
			scope:true,
			templateUrl:'/views/templates/show_level_template.html'
		};
	}]);

	dofusDirectives.directive('professionGathering',[function()
	{
		return {
			restrict:'E',
			scope:true,
			templateUrl:'/views/templates/profession_gathering.html'
		};
	}]);

	dofusDirectives.directive('slots', [function()
	{
		// Runs during compile
		return {
			scope: {
				slots: '@',
				crafts: '=',
				results: '=',
				main: '='
			},
			transclude: true,
			controller: ['$scope',function($scope)
			{
				$scope.desplegado = false;
			}],
			restrict: 'E',
			template: '<div id="Slot{{ ::slots }}" class="slots" ng-class="{ expanded: desplegado }" ng-transclude></div>',
			compile: function(tElement, tAttrs)
			{ 
				return function linking($scope, elm, attrs)
				{
					//console.log('PARENT ',$scope.desplegado)
				}
			}
		};
	}]);

	dofusDirectives.directive('numeroSlots', ['$filter',function($filter)
	{
		return {
			restrict:'E',
			templateUrl:'/views/templates/slots.html',
			require: '^slots',
			replace: true,
			controller: ['$scope',function($scope)
			{
				var slots 	= $scope.slots;

				$scope.toggleDesplegar = function(parent)
				{
					$scope.$parent.desplegado = !$scope.$parent.desplegado;
				};

				$scope.bloqueado = $scope.results.blocked($scope.profession.levelInicial,slots);
				$scope.inutil = $scope.results.useless($scope.profession.levelInicial,slots);
				$scope.cantidad = $filter('number')($scope.results.cantidadCrafts(slots));
			}],
			link: function($scope,$el)
			{
				$el.on('click',function(e)
				{
					$scope.toggleDesplegar();
					$scope.$root.$digest();
				});
			}
		}
	}]);

	dofusDirectives.directive('recipeList', [function()
	{
		return {
			require: '^slots',
			restrict: 'E',
			template: '<div class="recipeList" ng-if="$parent.desplegado" ng-transclude></div>',
			transclude: true,
		};
	}]);

	dofusDirectives.directive('recipeApi', [function(){
		return {
			scope: { profession: '=', receta: '=' },
			controller: ['$scope', function($scope)
			{
				$scope.showRecipe = false;
			}],
			restrict: 'A'
		};
	}]);

	dofusDirectives.directive('recetas', ['Test','$filter',function(Test,$filter)
	{
		return {
			restrict:'E',
			templateUrl:'/views/templates/recetas.html',
			require: '^slots',
			replace: true,
			controller:['$scope',function($scope)
			{
				$scope.sinEspacios = function(string)
				{
					return $filter('noSpace')(string);
				};

				$scope.calcRecipe = function(cantidadTotal,cantidadIng)
				{
					return  $filter('number')(~~cantidadTotal.replace(',','') * ~~cantidadIng);
				};
			}]
		}
	}]);

	var clickerTitleIngredient = function($scope,Test)
	{
		return function(e)
		{
			e.preventDefault();
			if(!!$scope.recetaObj && !$scope.showRecipe)
			{
				Test.getIngredients($scope.recetaObj,$scope.profession.lang).then(function()
				{
						$scope.profession.ingredientsi18n = Test.ingredientsi18n;
				});
			}

			$scope.showRecipe = !$scope.showRecipe;
			$scope.$digest();
		};
	}

	var linkerTitleIngredient = function(Test)
	{
		return function($scope,$e,a)
		{
			$e.on('click',clickerTitleIngredient($scope,Test));
		};
	};

	var compilerTitleIngredient = function(Test)
	{
		return function($e,attr)
		{
			return linkerTitleIngredient(Test);
		}
	};

	var titleIngredient = ['Test',function(Test)
	{
		return {
			restrict: 'E',
			transclude: true,
			template: '<div class="titleRecipe" ng-transclude></div>',
			require: 'recipeApi',
			//controller: controllerTitleIngredient(Test),
			compile: compilerTitleIngredient(Test)
		}
	}];

	dofusDirectives.directive('titleRecipe',titleIngredient);

	dofusDirectives.directive('listIngredients', [function()
	{
		return {
			restrict: 'E',
			template: '<div class="ingredientes" ng-if="showRecipe" ng-transclude></div>',
			require: 'recipeApi',
			transclude: true
		};
	}]);


})();