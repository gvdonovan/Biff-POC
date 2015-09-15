'use strict';

describe('Testing obuiRatingController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function () {
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiRatingController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here

    it('vm.hoveringOver method should set vm.overStar to value passed in and vm.percent to that percentage', function () {
        controller.hoveringOver(5);
        expect(controller.overStar).to.equal(5);
        expect(controller.percent).to.equal(50);

    });


});