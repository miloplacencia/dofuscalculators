(function(){
'use strict';

var dofusServices = angular.module('DofusExpCalculator');

dofusServices.service('DbService',function()
{
	this.gathering = {
		'Alchemist' : [
			{ 'gather' : 'Flax Flower',		'lvl': 1,	'exp': 10 },
			{ 'gather' : 'Hemp Flower',		'lvl': 10,	'exp': 15 },
			{ 'gather' : 'Five-Leaf Clover','lvl': 20,	'exp': 20 },
			{ 'gather' : 'Wild Mint Leaf',	'lvl': 30,	'exp': 25 },
			{ 'gather' : 'Freyesque Orchid','lvl': 40,	'exp': 30 },
			{ 'gather' : 'Edelweiss',		'lvl': 50,	'exp': 35 },
			{ 'gather' : 'Pandkin Seed',	'lvl': 50,	'exp': 35 },
			{ 'gather' : 'Snowdrop Flower', 'lvl': 100, 'exp': 60 }
		],
		'Farmer' : [
			{ 'gather': 'Wheat',	'lvl': 1,	'exp': 10 },
			{ 'gather': 'Barley',	'lvl': 10,	'exp': 15 },
			{ 'gather': 'Oats',		'lvl': 20,	'exp': 20 },
			{ 'gather': 'Hop',		'lvl': 30,	'exp': 25 },
			{ 'gather': 'Flax',		'lvl': 40,	'exp': 30 },
			{ 'gather': 'Rye',		'lvl': 50,	'exp': 35 },
			{ 'gather': 'Rice',		'lvl': 50,	'exp': 35 },
			{ 'gather': 'Malt',		'lvl': 60,	'exp': 40 },
			{ 'gather': 'Hemp',		'lvl': 70,	'exp': 45 },
			{ 'gather': 'Frosteez',	'lvl': 100,	'exp': 60 }
		],
		'Fisherman' : [
			{ 'gather': 'Snapper',			'lvl': 1,	'exp': 10 },
			{ 'gather': 'Small River Fish',	'lvl': 1,	'exp': 10 },
			{ 'gather': 'Small Sea Fish',	'lvl': 1,	'exp': 10 },
			{ 'gather': 'River Fish',		'lvl': 10,	'exp': 15 },
			{ 'gather': 'Sea Fish',			'lvl': 20,	'exp': 20 },
			{ 'gather': 'Large River Fish',	'lvl': 40,	'exp': 30 },
			{ 'gather': 'Large Sea Fish',	'lvl': 50,	'exp': 35 },
			{ 'gather': 'Giant River Fish',	'lvl': 70,	'exp': 45 },
			{ 'gather': 'Giant Sea Fish',	'lvl': 80,	'exp': 50 },
			{ 'gather': 'Frigost Fish',		'lvl': 100,	'exp': 60 }
		],
		'Lumberjack' : [
			{ 'gather': 'Ash Wood',			'lvl': 1,	'exp': 10 },
			{ 'gather': 'Chestnut Wood',	'lvl': 10,	'exp': 15 },
			{ 'gather': 'Walnut Wood',		'lvl': 20,	'exp': 20 },
			{ 'gather': 'Oak Wood',			'lvl': 30,	'exp': 25 },
			{ 'gather': 'Oliviolet Wood',	'lvl': 35,	'exp': 27 },
			{ 'gather': 'Bombu Wood',		'lvl': 35,	'exp': 27 },
			{ 'gather': 'Maple Wood',		'lvl': 40,	'exp': 30 },
			{ 'gather': 'Yew Wood',			'lvl': 50,	'exp': 35 },
			{ 'gather': 'Bamboo Wood',		'lvl': 50,	'exp': 35 },
			{ 'gather': 'Cherry Wood',		'lvl': 60,	'exp': 40 },
			{ 'gather': 'Ebony Wood',		'lvl': 70,	'exp': 45 },
			{ 'gather': 'Kaliptus Wood',	'lvl': 75,	'exp': 47 },
			{ 'gather': 'Hornbeam Wood',	'lvl': 80,	'exp': 50 },
			{ 'gather': 'Dark Bamboo Wood',	'lvl': 80,	'exp': 50 },
			{ 'gather': 'Elm Wood',			'lvl': 90,	'exp': 55 },
			{ 'gather': 'Aspen Wood',		'lvl': 100,	'exp': 60 },
			{ 'gather': 'Holy Bamboo Wood',	'lvl': 100,	'exp': 60 }
		],
		'Miner' : [
			{ 'gather': 'Iron',		'lvl': 1,	'exp': 10 },
			{ 'gather': 'Copper',	'lvl': 10,	'exp': 15 },
			{ 'gather': 'Bronze',	'lvl': 20,	'exp': 20 },
			{ 'gather': 'Cobalt',	'lvl': 30,	'exp': 25 },
			{ 'gather': 'Manganese','lvl': 40,	'exp': 30 },
			{ 'gather': 'Tin',		'lvl': 50,	'exp': 35 },
			{ 'gather': 'Silicate',	'lvl': 50,	'exp': 35 },
			{ 'gather': 'Silver',	'lvl': 60,	'exp': 40 },
			{ 'gather': 'Bauxite',	'lvl': 70,	'exp': 45 },
			{ 'gather': 'Gold',		'lvl': 80,	'exp': 50 },
			{ 'gather': 'Dolomite',	'lvl': 100,	'exp': 60 },
			{ 'gather': 'Obsidian',	'lvl': 100,	'exp': 60 }
		]
	};

	this.Professions = [
		'Alchemist',
		'Lumberjack',
		'Hunter',
		'Fisherman',
		'Farmer',
		'Miner',
		'Fishmonger',
		'Butcher',
		'Baker',
		'Tailor',
		'Jeweller',
		'Shoemaker',
		'Handyman',
		'Wand-Carver',
		'Staff-Carver',
		'Bow-Carver',
		'Axe-Smith',
		'Hammer-Smith',
		'Dagger-Smith',
		'Sword-Smith',
		'Shovel-Smith',
		'Shield-Smith'
	];

	this.expLvl = [0,50,140,271,441,653,905,1199,1534,1911,2330,2792,3297,3846,4439,5078,5762,6493,7271,8097,8973,9898,10875,11903,12985,14122,15315,16564,17873,19242,20672,22166,23726,25353,27048,28815,30656,32572,34566,36641,38800,41044,43378,45804,48325,50946,53669,56498,59437,62491,65664,68960,72385,75943,79640,83482,87475,91624,95937,100421,105082,109930,114971,120215,125671,131348,137256,143407,149811,156481,163429,170669,178214,186080,194283,202839,211765,221082,230808,240964,251574,262660,274248,286364,299037,312297,326175,340705,355924,371870,388582,406106,424486,443772,464016,485274,507604,531071,555741,581687];

	this.expCasilla = [1,10,25,50,100,250,500,1000];
	this.unlockLevel = [1,10,20,40,60,80,100];
	this.gatherCraft = {
		'gather' : ['Alchemist','Farmer','Fisherman','Lumberjack','Miner'],
		'craft'  : ['Baker','Butcher','Hunter','Fishmonger','Jeweller','Shoemaker','Tailor','Handyman','Bow carver','Staff carver','Wand carver','Axe smith','Dagger smith','Hammer smith','Shovel smith','Sword smith','Shield smith']
	};
});

dofusServices.service('CalculatorService',function(DbService)
{
	this.uselessLevel = function(lvl)
	{
		if(lvl>=40 && lvl<60)
		{ return [1]; }
		else if(lvl>=60 && lvl<80)
		{ return [1,2]; }
		else if(lvl>=80 && lvl<100)
		{ return [1,2,3]; }
		else if(lvl===100)
		{ return [1,2,3,4]; }
		else
		{ return []; }
	};

	this.isUseless = function(lvl,slot)
	{
		slot = parseInt(slot);
		if(lvl >= 40 && lvl<60)
		{
			if(slot===1)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else if(lvl>=60 && lvl<80)
		{
			if(slot===1 || slot===2)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else if(lvl>=80 && lvl<100)
		{
			if(slot===1 || slot===2 || slot===3)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else if(lvl===100)
		{
			if(slot===1 || slot===2 || slot===3 || slot===4)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	};

	this.blockedLevel = function(lvl,slot)
	{
		var unlockLevel = [1,1,10,20,40,60,80,100];
		if(lvl<unlockLevel[parseInt(slot-1)])
		{ return true; }
		else
		{ return false; }
	};

	this.buscarNivel = function(exp)
	{
		var k=0;
		while(exp>=DbService.expLvl[k] && exp>=0 && exp <= 581687)
		{
			k++;
		}
		return k;
	};

	this.experienciaRestante = function(exp,nvlFinal)
	{
		var lvlFinal	= nvlFinal || 100,
			lvlInicial	= this.buscarNivel(exp),
			xpFinal		= DbService.expLvl[lvlFinal-1] || 581687,
			restante	= xpFinal - exp;

		return {
			expBase		: Math.floor(exp),
			expRestante : (restante>0)?parseInt(restante):581687,
			expFinal	: parseInt(xpFinal),
			lvlFinal	: Math.floor(lvlFinal),
			lvlInicial	: parseInt(lvlInicial)
		};
	};

	this.levelInicial = function(exp)
	{
		var lvlInicial = (exp<581687)?this.buscarNivel(exp):100;
		return parseInt(lvlInicial);
	};

	this.expRestante = function(exp,lvlFinal)
	{
		lvlFinal = lvlFinal || 100;
		var xpFinal = DbService.expLvl[lvlFinal-1] || 581687;
		return parseInt(xpFinal - exp);
	};

	this.calcularExpPorCasilla = function(expRestante)
	{
		var arrExp	= {};
		for(var k=0;k<DbService.expCasilla.length;k++)
		{
			arrExp[k] = Math.ceil(expRestante/DbService.expCasilla[k]);
		}
		
		return arrExp;
	};

	this.isGatheringTrue = function(profession)
	{
		var gathering = false;
		for(var j=0,len=DbService.gatherCraft.gather.length;j<len;j++)
		{
			if(DbService.gatherCraft.gather[j]===profession)
			{
				gathering = true;
			}
		}
		return gathering;
	};

	this.removeBlank = function(arr)
	{
		for (var i in arr)
		{
			if (arr[i].length===0)
			{
				delete arr[i];
			}
		}
		return arr;
	};

	this.separarNumeros = function(num)
	{
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	};
});

dofusServices.service('Crafts', ['$http','$filter','CalculatorService',function($http,$filter,CS)
{
	this.list;
	this.recipes;
	this.setRecipes = function()
	{
		var recipe = {};
		angular.forEach(this.list,function(val,i)
		{
			var data = {
				desplegado: false,
				limiteRecursos: 0,
				bloqueado: false,
				inutil: false,
				cantidad: 0,
				recipes: {}
			};

			angular.forEach(val,function(v,n)
			{
				data.recipes[n] = {
					calcRecipe: false,
					toggleCalcRecipe: function()
					{
						this.calcRecipe = !this.calcRecipe;
					}
				};
			});
			recipe[i] = data;
		});

		return recipe;
	};

	this.get = function(profession)
	{
		var $this = this;
		NProgress.start();
		return $http.get('JSON/'+profession.toLowerCase()+'.json',{ cache : true })
				.success(function(data)
				{
					$this.list = CS.removeBlank(data[profession]);
					$this.recipes = $this.setRecipes();
					NProgress.done();
				});
	};
}]);

})();