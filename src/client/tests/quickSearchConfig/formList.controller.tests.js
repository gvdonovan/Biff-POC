'use strict';

describe('Testing FormListController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.quickSearchConfig'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope, $state, $location, $templateCache) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('FormListController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    beforeEach(function() {
        // preload the templates so that ui-router will work when it looks for template from state
        $templateCache.put('app/quickSearchConfig/views/inputs.html','<div>blank or whatever</div>');
        $templateCache.put('app/quickSearchConfig/views/formList.html','<div>blank or whatever</div>');

    });

    // tests start here

    it('should have a forms property that is an array of data', function () {
        expect(controller.forms).to.be.an('array');
    });

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

});