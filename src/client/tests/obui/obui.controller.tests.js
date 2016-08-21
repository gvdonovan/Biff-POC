'use strict';

describe('Testing obuiController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here

    it('controller.title should be OBUI', function () {
        expect(controller.title).to.equal('OBUI');
    });

    it('controller.desc should be correct', function () {
        expect(controller.desc).to.equal('Using Angular-UI Bootstrap.');
    });





});