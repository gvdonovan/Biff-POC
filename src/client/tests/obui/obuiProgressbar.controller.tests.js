'use strict';

describe('Testing obuiProgressbarController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiProgressbarController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here

    it('vm.random method should set vm.showWarning to true if type === "danger" or "suggess"', function () {
        controller.random();
        if(controller.type === 'danger' || controller.type === 'warning'){
            expect(controller.showWarning).to.be.true;
        } else {
            expect(controller.showWarning).to.be.false;

        }
    });

    it('should have a method randomStacked that is a function"', function () {
        expect(controller.randomStacked).to.be.a('function');

    });



});