'use strict';

describe('Testing obuiPaginationController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiPaginationController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here

    it('should set vm.currentPage when setPage is called with a pageNo', function () {
        controller.setPage(10);

        expect(controller.currentPage).to.equal(10);
    });



});