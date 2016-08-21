'use strict';

describe('Testing DefaultController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.default'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope, $state, $location, $templateCache, defaultService) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('DefaultController');
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

    it('title of form should be Default', function () {
        expect(controller.title).to.equal('Default');
    });

    it('should have submit function', function () {
        // we are stubbing out navRoutes in the beforeEach with sinon.stub on routerHelper
        expect(controller.sbumit).to.be.defined;
    });

    it('should call defaultService.getResults when submit button is clicked', function () {
        // stub defaultService.getResults
        var spy = sinon.spy(defaultService, 'getResults');
        controller.submit();
        expect(spy).to.have.been.calledOnce;
    });


});