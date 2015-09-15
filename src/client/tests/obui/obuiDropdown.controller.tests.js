'use strict';

describe('Testing obuiDropdownController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiDropdownController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here
    it('should open/close the dropdown when toggleDropdown is called', function () {
        var div = document.createElement('div');
        var e = {
            target: div,
            preventDefault: sinon.spy(),
            stopPropagation: sinon.spy()
        };
        controller.toggleDropdown(e);
        expect(controller.status.isopen).to.be.true;
    });

});