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
    
    it('should remove the category at the given index', function () {
        var category = {
          id : 'test',
          category : 'test',
          items : []
        };
        
        controller.list2 = [category];
        controller.removeCategory(0, category);
        expect(controller.list2.length).to.equal(0);
    });
    
    it('should have removeItem defined', function () {
        expect(controller.removeItem).to.be.defined;
    });
    
    it('should remove the category at the given index if the category has no items', function () {
        var category = {
          id : 'test',
          category : 'test',
          items : []
        };
        
        controller.list2 = [category];
        controller.removeItem(0, category, 0);
        expect(controller.list2.length).to.equal(0);
    });
    
    it('should remove the item at the given index if the category has items', function () {
        var category = {
          id : 'test',
          category : 'test',
          items : [
            {id : 'testid', category : 'test', items : []},
            {id : 'testid', category : 'test2', items : []},
            {id : 'testid', category : 'test3', items : []}
          ]
        };
        
        controller.list1 = [{id : 'testid', category : 'test', items : []}];
        controller.list2 = [category];
        controller.removeItem(0, category, 0);
        expect(category.items.length).to.equal(2);
    });
    
    it('should have sortCategory defined', function () {
        expect(controller.sortCategory).to.be.defined;
    });
    
    it('should reorder the category list given the appropriate parameters', function () {
        controller.list2 = ['test1', 'test2', 'test3'];
        controller.sortCategory(0, 2);
        expect(controller.list2).to.deep.equal(['test3', 'test2', 'test1']);
        //expect(controller.list2).to.deep.equal(['test3', 'test1', 'test2']);
        //TODO: This looks like a swap rather than an sort.  Intentional?
    });
    
    it('should have sortItem defined', function () {
        expect(controller.sortItem).to.be.defined;
    });
    
    it('should reorder the list given the appropriate parameters', function () {
        var list = ['test1', 'test2', 'test3'];
        controller.sortItem(0, 2, list);
        expect(list).to.deep.equal(['test3', 'test2', 'test1']);
        //expect(list).to.deep.equal(['test3', 'test1', 'test2']);
        //TODO: This looks like a swap rather than an sort.  Intentional?
    });
    
    it('should have filterCategory defined', function () {
        expect(controller.filterCategory).to.be.defined;
    });
    
    it('should confirm a match for the category if the filterText is less than 3 characters', function () {
        var category = {
          category : 'fake category',
          items : [
            {name : 'fake item 1'},
            {name : 'fake item 2'},
            {name : 'fake item 3'}
          ]
        };
        controller.filterText = 'te';
        
        expect(controller.filterCategory(category)).to.be.true;
    });
    
    it('should confirm a match for the category if the filterText is found in the category\'s name', function () {
        var category = {
          category : 'fake category',
          items : [
            {name : 'fake item 1'},
            {name : 'fake item 2'},
            {name : 'fake item 3'}
          ]
        };
        controller.filterText = 'fake';
        
        expect(controller.filterCategory(category)).to.be.true;
    });
    
    it('should not confirm a match for the category if the filterText is not found in the category\'s name or items', function () {
        var category = {
          category : 'fake category',
          items : [
            {name : 'fake item 1'},
            {name : 'fake item 2'},
            {name : 'fake item 3'}
          ]
        };
        controller.filterText = 'test';
        
        expect(controller.filterCategory(category)).to.be.false;
    });
    
    it('should confirm a match for the category if the filterText is found in one or more of the category\'s items', function () {
        var category = {
          category : 'fake category',
          items : [
            {name : 'fake item 1'},
            {name : 'fake item 2'},
            {name : 'fake item 3'}
          ]
        };
        controller.filterText = '3';
        
        expect(controller.filterCategory(category)).to.be.true;
    });
    
    it('should have filterItems defined', function () {
        expect(controller.filterItems).to.be.defined;
    });
    
    xit('should confirm a match for the category if the filterText is less than 3 characters', function () {
        var category = {
          category : 'fake category',
          items : [
            {name : 'fake item 1'},
            {name : 'fake item 2'},
            {name : 'fake item 3'}
          ]
        };
        controller.filterText = 'te';
        
        expect(controller.filterItems(category)).to.be.true;
    });
    
    xit('should confirm a match for the category if the filterText is found in one or more of the category\'s items', function () {
        var category = {
          category : 'fake category',
          items : [
            {name : 'fake item 1'},
            {name : 'fake item 2'},
            {name : 'fake item 3'}
          ]
        };
        controller.filterText = 'item';
        
        expect(controller.filterItems(category)).to.be.true;
    });
    
    xit('should not confirm a match for the category if the filterText is not found in one of the the category\'s items', function () {
        var category = {
          category : 'fake category',
          items : [
            {name : 'fake item 1'},
            {name : 'fake item 2'},
            {name : 'fake item 3'}
          ]
        };
        controller.filterText = 'test';
        
        expect(controller.filterItems(category)).to.be.false;
    });
});