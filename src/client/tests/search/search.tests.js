'use strict';

describe('Testing SearchController', function () {
    var searchController, mockedSearchService, deferred, rootScope, $httpBackend;
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app.search'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function ($controller, _quickSearchService_, $q, _$rootScope_, $httpBackend) {

        //declare the controller since we are using controller as we do not need scope
        searchController = $controller('SearchController');
        // init the mock
        mockedSearchService = _quickSearchService_;
        deferred = $q;
        rootScope = _$rootScope_;

        // set up expected http requests
        $httpBackend.whenGET('app/core/404.html').respond(404);
    }));
    // tests start here
    it('should have a title of Quick Search', function () {
        //create a watcher on the getResults method of the service and call through the promise
        expect(searchController.title).to.equal('Quick Search');
    });

    it('getResults should have been called', function () {
        //create a watcher on the getResults method of the service, and call through the promise
        sinon.spy(mockedSearchService, 'getResults');
        searchController.submit();
        rootScope.$apply();//needed for expect to work correctly
        expect(mockedSearchService.getResults).to.have.been.calledOnce;
    });
});