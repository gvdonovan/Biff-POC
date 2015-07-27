'use strict';

describe('Testing SearchController', function () {
    var searchController, mockedSearchService, deferred, rootScope;
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app.search'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function ($controller, _quickSearchService_, $q, _$rootScope_) {

        //declare the controller since we are using controller as we do not need scope
        searchController = $controller('SearchController');
        // init the mock
        mockedSearchService = _quickSearchService_;
        deferred = $q;
        rootScope = _$rootScope_;

    }));
    // tests start here
    it('should have a title of Quick Search', function () {
        //create a watcher on the getResults method of the service and call through the promise
        expect(searchController.title).toBe('Quick Search');
    });

    it('getResults should have been called', function () {
        //create a watcher on the getResults method of the service, and call through the promise
        spyOn(mockedSearchService, 'getResults').and.callThrough();
        searchController.submit();
        rootScope.$digest();//needed for expect to work correctly
        expect(mockedSearchService.getResults).toHaveBeenCalled();
    });
});