'use strict';

describe('Testing obuiTooltipController', function () {
    var controller, deferred, rootScope, spy;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function () {
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiTooltipController');
            deferred = $q;
            rootScope = $rootScope;


        })
    });

    // tests start here

    // no real logic here to test

});