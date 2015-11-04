(function()
{

'use strict';

angular.module('DofusExpCalculator', 
  [
    'ngResource',
    'ngRoute',
    'ngTouch',
    //'ngAnimate'
  ]);

  var app = angular.module('DofusExpCalculator');
  app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider)
  {
    var professions_calculator = {
      templateUrl: '/views/professions.html',
      controller: 'ProfessionsController'
    };

    var hunter_calculator = {
      templateUrl : '/views/hunter.html',
      controller  : 'HunterController'
    };

    var ingredients_calculator = {
      templateUrl : '/views/ingredients.html',
      controller  : 'IngredientsController'
    };

    $routeProvider
      .when('/:lang/profession_calculator', {
        templateUrl: '/views/professions.html',
        controller: 'ProfessionsController'
      })

      //EN
      .when('/:lang/professions_calculator/',professions_calculator)
      .when('/:lang/professions_calculator/:profession/:exp/:level',professions_calculator)
      //ES
      .when('/:lang/calculadora_oficios/',professions_calculator)
      .when('/:lang/calculadora_oficios/:profession/:exp/:level',professions_calculator)

      //EN
      .when('/:lang/hunter_calculator',hunter_calculator)
      .when('/:lang/hunter_calculator/:calculator',hunter_calculator)
      //ES
      .when('/:lang/calculadora_cazador',hunter_calculator)
      .when('/:lang/calculadora_cazador/:calculator',hunter_calculator)

      .when('/:lang/ingredients_calculator',ingredients_calculator)
      .otherwise({
        redirectTo: '/en/professions_calculator'
      });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }]);

  //CORS
  app.factory('Loader',[function()
  {
    return {
      request: function(config)
      {
        NProgress.start();
        return config;
      },
      response: function(response)
      {
        NProgress.done();
        return response;
      }
    };
  }]);

  app.config(['$httpProvider',function($httpProvider)
  {
    $httpProvider.interceptors.push('Loader');
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]);



})();