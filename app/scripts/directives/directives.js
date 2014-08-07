(function()
{

'use strict';

var dofusDirectives = angular.module('DofusExpCalculator');

dofusDirectives.directive('profesionesLista',function()
{
	return {
		restrict:'E',
		scope: {
			profession: '='
		},
		controller:'ProfessionsController',
		templateUrl:'views/templates/professions_template.html'
	};
});

dofusDirectives.directive('errorMsg',function()
{
	return {
		restrict:'E',
		scope: true,
		templateUrl:'views/templates/error.html'
	};
});

dofusDirectives.directive('showLevel',function()
{
	return {
		restrict:'E',
		scope:true,
		templateUrl:'views/templates/show_level_template.html'
	};
});

dofusDirectives.directive('professionGathering',function()
{
	return {
		restrict:'E',
		scope:true,
		templateUrl:'views/templates/profession_gathering.html'
	};
});

dofusDirectives.directive('slots',function()
{
	return {
		restrict:'E',
		scope:{
			profession:'=',
			results:'=',
			slots:'@'
		},
		templateUrl:'views/templates/slots.html',
		link: function($scope,$e,a)
		{
			var slots = $scope.slots;
			var data = $scope.results.slots[slots];
			$scope.toggleDesplegar = function()
			{
				data.desplegado = !data.desplegado;
			};

			data.bloqueado = $scope.results.blocked($scope.profession.levelInicial,slots);
			data.inutil = $scope.results.useless($scope.profession.levelInicial,slots);
			data.cantidad = $scope.results.cantidadCrafts(slots);
		}
	}
});


dofusDirectives.directive('recetas',function(){
	return {
		restrict:'E',
		templateUrl:'views/templates/recetas.html'
	}
});


})();