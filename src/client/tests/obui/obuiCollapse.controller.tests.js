'use strict';

describe('Testing obuiCollapseController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiCollapseController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here

    it('should have isCollapsed set to false initially', function () {
        expect(controller.isCollapsed).to.equal(false);
    });






});