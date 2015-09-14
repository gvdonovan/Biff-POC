'use strict';

describe('Testing DefaultController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.admin'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope, $state, $location, $templateCache) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('adminController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    beforeEach(function() {
        // preload the templates so that ui-router will work when it looks for template from state
        /*
         $templateCache.put('app/core/404.html','<div>blank or whatever</div>');
         $templateCache.put('app/quickSearchConfig/views/formList.html','<div>blank or whatever</div>');
         */

    });

    // tests start here

    it('title of form should be Admin', function () {
        expect(controller.title).to.equal('Admin');
    });

    it('should have list1 which is an array', function () {
        expect(controller.list1).to.be.an('array');
    });

    it('list1 array should have length 3', function () {
        expect(controller.list1.length).to.equal(3);
    });

    it('each object in list1 should have items prop with array of length 500', function () {
        expect(controller.list1[0].items.length).to.equal(500);
    });

    it('should have a moveRight function', function () {
        expect(controller.moveRight).to.be.a('function');
    });

    it('should have a selectCategory function', function () {
        expect(controller.selectCategory).to.be.a('function');
    });

    it('should have a removeCategory function', function () {
        expect(controller.removeCategory).to.be.a('function');
    });

    it('should have a removeItem function', function () {
        expect(controller.removeItem).to.be.a('function');
    });

    it('should have a sortCategory function', function () {
        expect(controller.sortCategory).to.be.a('function');
    });

    it('should have a sortItem function', function () {
        expect(controller.sortItem).to.be.a('function');
    });

    it('should have a filterCategory function', function () {
        expect(controller.filterCategory).to.be.a('function');
    });

    it('should have a filterItems function', function () {
        expect(controller.filterItems).to.be.a('function');
    });

    // TODO: write unit test for functionality of moveRight. commented out code in func suggests func incomplete

    it('selectCategory should toggle category.selected to true and item.selected to true', function () {
        var category = mockAdminData.selectCategoryData;
        controller.selectCategory(category);
        expect(category).to.deep.equal(mockAdminData.selectCategoryDataExpected);
    });

    it('removeCategory should remove the category from list2 (from 2 categories to 1)', function () {
        controller.list2 = mockAdminData.mockList2;
        var category = mockAdminData.mockList2[0];
        controller.removeCategory(0, category);
        expect(controller.list2.length).to.equal(1);
    });

    it('removeItem method should remove an item from the category in list2', function () {
        controller.list2 = mockAdminData.removeItemData;
        var category = mockAdminData.removeItemData[0];
        controller.removeItem(0, category, 0);
        expect(controller.list2.length).to.equal(1);
    });

    it('sortItem method should move an item up or down', function () {
        var list = mockAdminData.sortItemData[0].items;
        // move item at index 0 down 1 position, item has id=1
        controller.sortItem(0, 1, list);
        expect(list[1].id).to.equal(1);
    });
    
    describe('filterCategory method', function(){
        it('should return true if category name or sub-item contains search text', function () {
            controller.filterText = 'category';
            var category = mockAdminData.selectCategoryData;
            // move item at index 0 down 1 position, item has id=1
            var result = controller.filterCategory(category);
            expect(result).to.be.true;
        });

        it('should return false if category name or sub-item contains search text', function () {
            controller.filterText = 'jumpin';
            var category = mockAdminData.selectCategoryData;
            // move item at index 0 down 1 position, item has id=1
            var result = controller.filterCategory(category);
            expect(result).to.be.false;
        });

    });


    describe('filterItems method', function(){
    
        it('filterItems should return true if category contains sub-item from search text', function () {
            controller.filterText = 'item1';
            var category = mockAdminData.selectCategoryData;
            // move item at index 0 down 1 position, item has id=1
            var result = controller.filterCategory(category);
            expect(result).to.be.true;
        });

        it('filterItems should return false if category does nto contain sub-item from search text', function () {
            controller.filterText = 'item3';
            var category = mockAdminData.selectCategoryData;
            // move item at index 0 down 1 position, item has id=1
            var result = controller.filterCategory(category);
            expect(result).to.be.false;
        });

    });
});