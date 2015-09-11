'use strict';

describe('Testing NavController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.layout'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope, $state, $location, $templateCache, routerHelper) {

            // stub routerHelper.getStates before controller is instantiated
            var stub = sinon.stub(routerHelper);
            stub.getStates.returns(mockData.getStates());

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('NavController');
            deferred = $q;
            rootScope = $rootScope;



        })
    });

    beforeEach(function() {
        // preload the templates so that ui-router will work when it looks for template from state
        $templateCache.put('app/core/404.html','<div>blank or whatever</div>');
        $templateCache.put('app/quickSearchConfig/views/formList.html','<div>blank or whatever</div>');

    });

    // tests start here

    it('should set vm.navRoutes when the controller loads (activate func called)', function () {
        $rootScope.$apply();
        expect(controller.navRoutes).to.be.an('array');
    });

    it('should filter states by nav and top properties in getNavRoutes and sort by the nav property', function () {
        // we are stubbing out navRoutes in the beforeEach with sinon.stub on routerHelper
        expect(controller.navRoutes).to.deep.equal(mockData.expectedGetStates());
    });

});