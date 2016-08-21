'use strict';

describe('Testing obuiAlertController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiAlertController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here

    it('addAlert method should push to the alerts array', function () {
        controller.addAlert();
        // alerts array goes from length 2 to 3
        expect(controller.alerts.length).to.equal(3);
    });

    it('closeAlert method remove alert from alerts array', function () {
        controller.closeAlert(0);
        // splice out index 0 and check that the alert message that remains is the one formerly at index 1
        expect(controller.alerts[0].type).to.equal('success');
    });






});