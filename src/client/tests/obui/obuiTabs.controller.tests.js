'use strict';

describe('Testing obuiTabsController', function () {
    var controller, deferred, rootScope, spy;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function () {
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope, $window, $templateCache, $timeout) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiTabsController');
            deferred = $q;
            rootScope = $rootScope;

            // preload the templates so that ui-router will work when it looks for template from state
            $templateCache.put('app/core/404.html', '<div>blank or whatever</div>');


        })
    });

    // tests start here

    it('invoking vm.alertMe should open an alert window', function () {
        // since there is a setTimeout in alertMe, we need to wait before we make assertion
        //override window.alert
        $window.alert = function(){};
        spy = sinon.spy($window, 'alert');
        controller.alertMe();
        // flush the timeout to make the $timeout synchrounous for our test purposes
        $timeout.flush();
        expect(spy).to.have.been.calledOnce;




    });



});