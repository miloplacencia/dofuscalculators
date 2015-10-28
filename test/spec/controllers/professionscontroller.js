'use strict';

describe('Controller: ProfessionscontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('dofusExpCalculatorApp'));

  var ProfessionscontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfessionscontrollerCtrl = $controller('ProfessionscontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
