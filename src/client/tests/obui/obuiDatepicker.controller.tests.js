'use strict';

describe('Testing obuiDatepickerController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiDatepickerController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here

    it('addItem method should create a new item with item number incrementing', function () {
        controller.addItem();
        expect(controller.items[3]).to.equal('Item 4');
    });






});