'use strict';

describe('Directive: ngRepeatFix', function () {

  // load the directive's module
  beforeEach(module('dofusExpCalculatorV20App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-repeat-fix></ng-repeat-fix>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngRepeatFix directive');
  }));
});
