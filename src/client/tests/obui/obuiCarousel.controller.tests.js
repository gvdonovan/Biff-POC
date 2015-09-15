'use strict';

describe('Testing obuiCarouselController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope, $animate) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiCarouselController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here

    it('addSlide method should add a new slide image', function () {
        expect(controller.slides.length).to.equal(4);
        controller.addSlide();
        // slides array goes from length 4 to 5
        expect(controller.slides.length).to.equal(5);
    });




});