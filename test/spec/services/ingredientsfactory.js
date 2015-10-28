'use strict';

describe('Service: IngredientsFactory', function () {

  // load the service's module
  beforeEach(module('dofusExpCalculatorApp'));

  // instantiate service
  var IngredientsFactory;
  beforeEach(inject(function (_IngredientsFactory_) {
    IngredientsFactory = _IngredientsFactory_;
  }));

  it('should do something', function () {
    expect(!!IngredientsFactory).toBe(true);
  });

});
