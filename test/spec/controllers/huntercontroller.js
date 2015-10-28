'use strict';

describe('Controller: HuntercontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('dofusExpCalculatorApp'));

  var HuntercontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HuntercontrollerCtrl = $controller('HuntercontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
