'use strict';

describe('Testing obuiModalController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope, $modal) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiModalController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here

    it('calling open method should open the modal', function () {
        var spy = sinon.spy($modal, 'open');
        controller.open(500);
        expect(spy).to.have.been.calledOnce;
    });


    it('toggleAnimation should toggle true/false', function () {
        //controller.animationsEnabled is initially false
        controller.toggleAnimation();
        expect(controller.animationsEnabled).to.be.false;
    });






});