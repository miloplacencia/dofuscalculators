(function()
{
'use strict';

var dofusFilters = angular.module('DofusExpCalculator');

dofusFilters.filter('noSpace',[function()
{
	return function(string)
	{
		if(!!string) string.replace(' ','');
	};
}]);



})();