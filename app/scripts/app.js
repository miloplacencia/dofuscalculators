(function()
{

'use strict';

angular.module('DofusExpCalculator', 
  [
    'ngResource',
    'ngRoute',
    'ngTouch',
    'ngAnimate'
  ]);

angular.module('DofusExpCalculator')
  .config(function($routeProvider){
    $routeProvider
      .when('/professions_calculator', {
        templateUrl: 'views/professions.html',
        controller: 'ProfessionsController'
      })
      .when('/professions_calculator/:profession/:exp/:level',{
        templateUrl:'views/professions.html',
        controller :'ProfessionsController'
      })
      .when('/hunter_calculator',{
        templateUrl : 'views/hunter.html',
        controller  : 'HunterController'
      })
      .when('/hunter_calculator/:calculator',{
        templateUrl : 'views/hunter.html',
        controller  : 'HunterController'
      })
      .otherwise({
        redirectTo: '/professions_calculator'
      });
  });



})();