'use strict';

describe('Testing LoanOfficersController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.quickSearchConfig'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope, $state, $location, $templateCache) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('LoanOfficersController');
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
    it('should be created successfully', function () {
        expect(controller).to.be.defined;
    });
    
    it('should have moveRight defined', function () {
        expect(controller.moveRight).to.be.defined;
    });
    
    it('should have selectCategory defined', function () {
        expect(controller.selectCategory).to.be.defined;
    });
    
    it('should select the category when selectCategory function is called with a category that is not selected', function() {
        var category = {
          selected : false,
          items : [
            {selected: false},
            {selected: false}
          ]
        };
        
        controller.selectCategory(category);
        expect(category.selected).to.be.true;
    });
    
    it('should unselect the category when selectCategory function is called with a category that is selected', function() {
        var category = {
          selected : true,
          items : [
            {selected: true},
            {selected: true}
          ]
        };
        
        controller.selectCategory(category);
        expect(category.selected).to.be.false;
    });
    
    it('should have removeCategory defined', function () {
        expect(controller.removeCategory).to.be.defined;
    });
    
    it('should have removeItem defined', function () {
        expect(controller.removeItem).to.be.defined;
    });
    
    it('should have sortCategory defined', function () {
        expect(controller.sortCategory).to.be.defined;
    });
    
    it('should have sortItem defined', function () {
        expect(controller.sortItem).to.be.defined;
    });
    
    it('should have filterCategory defined', function () {
        expect(controller.filterCategory).to.be.defined;
    });
    
    it('should have filterItems defined', function () {
        expect(controller.filterItems).to.be.defined;
    });
    
});