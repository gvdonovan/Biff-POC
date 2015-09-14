'use strict';

describe('Testing obuiTimepickerController', function () {
    var controller, deferred, rootScope, spy;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function () {
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiTimepickerController');
            deferred = $q;
            rootScope = $rootScope;


        })
    });

    // tests start here

    it('should set vm.ismeridian to true/false if toggleMode is invoked', function () {
        controller.toggleMode();
        expect(controller.ismeridian).to.be.false;
    });

    it('should set vm.mytime to 14:00 when vm.update is called', function () {
        controller.update();
        // use a RegEx to test if the date string contains 14:00. RegEx is faster than indexOf in many cases
        var pattern = /14:00/g;
        expect(pattern.test(controller.mytime)).to.be.true;
    });

    it('should set vm.mytime to null when vm.clear is called', function () {
        controller.clear();
        expect(controller.mytime).to.equal(null);
    });



});