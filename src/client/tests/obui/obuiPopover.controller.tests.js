'use strict';

describe('Testing obuiPopoverController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiPopoverController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here

    it('should have vm.dynamicPopover as an object', function () {

        expect(controller.dynamicPopover).to.be.an('object');
    });



});