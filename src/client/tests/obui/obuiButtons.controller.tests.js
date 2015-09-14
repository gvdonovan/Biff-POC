'use strict';

describe('Testing obuiButtonsController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiButtonsController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here

    // currently there is really no logic in this controller that needs to be tested






});