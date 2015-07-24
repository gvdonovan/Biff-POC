'use strict';

describe('SearchController', function () {
    var searchController;
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app.search'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function ($controller) {
        //declare the controller since we are using controller as we do not need scope
        searchController = $controller('SearchController', {});
    }));
    // tests start here
    it('should have a title of Quick Search', function () {
        expect(searchController.title).toBe('Quick Search');
    });
});