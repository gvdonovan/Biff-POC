'use strict';

describe('Testing NavController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.layout'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope, $state, $location, $templateCache, routerHelper) {

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
        console.log('controller is ', controller);
        $rootScope.$apply();
        expect(controller.navRoutes).to.be.an('array');
    });

/*
    it('should build URL from parameters passed to $state', function () {
        var newState = 'quickSearchConfigInputs';
        expect($state.href(newState, {formId: 5})).to.equal('/quickSearchConfig/inputs/5/false');
    });

    it('should change state to quickSearchConfigs when add function is called', function () {
        controller.add();
        $rootScope.$apply();
        expect($state.current.name).to.equal('quickSearchConfigInputs');

    });

    it('should change state to quickSearchConfigInputs when edit function is called and url to ' +
        'include parameter passed', function () {
        controller.edit(5);
        $rootScope.$apply();
        expect($state.current.name).to.equal('quickSearchConfigInputs');
        expect($location.path()).to.equal('/quickSearchConfig/inputs/5/true');

    });
*/

});