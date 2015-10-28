'use strict';

describe('Service: HunterFactory', function () {

  // load the service's module
  beforeEach(module('dofusExpCalculatorV20App'));

  // instantiate service
  var HunterFactory;
  beforeEach(inject(function (_HunterFactory_) {
    HunterFactory = _HunterFactory_;
  }));

  it('should do something', function () {
    expect(!!HunterFactory).toBe(true);
  });

});
