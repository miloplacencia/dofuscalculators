(function(){

'use strict';

var dofusControllers =  angular.module('DofusExpCalculator');

dofusControllers
	.controller('MainController',['$scope','$routeParams','$location','$rootScope',function($scope,$routeParams,$location,$rootScope)
{
	$rootScope.main = {
		lang: 'en',
		section: 'profession',
		texts: {

			searchIn: {
				en: 'Search Recipes in',
				es: 'Buscar Recetas en'
			},

			searchInput : {
				en: 'Search Recipes',
				es: 'Buscar Recetas'
			},

			footer: {
				part1: {
					en: 'Dofus belongs to Ankama. This site is a fan creation by milo Placencia, who is not associated with Ankama in any way.',
					es: 'Dofus pertenece a Ankama. Este sitio es una creación de un Fan (milo Placencia), el cual no esta asociado con Ankama de ninguna forma.'
				},
				part2: {
					en: 'You\'ve got feedback? Mail me!',
					es: 'Tienes algun tipo de Feedback? Contactame!'
				}
			},

			hunter: {
				title: {
					en: 'Dofus Hunter &amp; Butcher Calculator',
					es: 'Calculadora de Cazador/Carnicero Dofus'
				},

				description: {
					en: 'Dofus Fan-site dedicated to help you mass-craft recipes for the Hunter and Butcher professions',
					es: 'Dofus Fan-site creado como calculadora para ayudarte en la creación en masa de recetas de Carnicero/Cazador'
				},

				h2: {
					en: 'Search Recipes for',
					es: 'Buscar Recetas para'
				},

				hunterBar: {
					hb: {
						en: 'Hunter & Butcher',
						es: 'Cazador y Carnicero'
					},
					h: {
						en: 'Only Hunter',
						es: 'Sólo Cazador'
					},
					b: {
						en: 'Only Butcher',
						es: 'Sólo Carnicero'
					}
				},

				resultTable: {
					n: {
						en: 'Name',
						es: 'Nombre'
					},
					q: {
						en: 'Quantity',
						es: 'Cantidad'
					},
					p: {
						en: 'Price',
						es: 'Precio'
					},
					tprice: {
						en: 'Total Price',
						es: 'Precio Total'
					},
					tpods: {
						en: 'Total Pods',
						es: 'Pods Totales'
					}
				}
			},

			profession: {
				title: {
					en: 'Dofus Profession Calculator',
					es: 'Calculadora de Oficios/Profesiones de Dofus'
				},

				description: {
					en: 'Dofus Fan-site dedicated to help you level up your professions, giving you calculators for recipes and materials, only with your actual experience',
					es: 'Dofus Fan-site creado para ayudarte a subir de nivel tus Oficios en Dofus, dandote las recetas/ingredientes que necesitas para llegar a tu nivel buscado.'
				},

				dataEnter: {
					insert: {
						en: 'Insert your data',
						es: 'Ingresa tus datos'
					},
					exp: {
						en: 'Base experience',
						es: 'Experiencia base'
					},
					lvl: {
						en: 'Goal Level',
						es: 'Nivel Final'
					}
				},

				selectPro: {
					en: 'Select your Profession',
					es: 'Selecciona tu Oficio/Profesión'
				},

				list: {
					en: 'List of Recipes',
					es: 'Lista de Recetas'
				},

				gatheringList: {
					title: {
						en: 'List of Resources',
						es: 'Lista de Recursos'
					},
					lvl: {
						en: 'Level',
						es: 'Nivel'
					},
					res: {
						en: 'Resource',
						es: 'Recurso'
					},
					exp: {
						en: 'Experience',
						es: 'Experiencia'
					}
				},

				slot: {
					en: 'Slots',
					es: 'Casillas'
				},

				useless: {
					en: '(This Recipes won\'t give you any exp at your level)',
					es: '(Estas Recetas no te dará Experiencia a tu nivel)'
				},
				
				blocked: {
					en: '(You can\'t craft this recipes at your level)',
					es: '(No puedes crear estas Recetas a tu nivel)'
				}


			}
		},
		setLang: function(lang)
		{
			this.lang = lang;
		}
	};

	$scope.is = {
		profession 		: function()
		{
			return $location.path().indexOf('profession')!==-1 || $location.path() === '/' || $location.path().indexOf('oficio')!==-1;
		},
		hunterButcher	: function()
		{
			return $location.path().indexOf('hunter')!==-1 || $location.path().indexOf('cazador')!==-1;
		},
		ingredients		: function()
		{
			return $location.path().indexOf('ingredients_calculator')!==-1;
		}
	};
}]);

})();