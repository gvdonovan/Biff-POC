'use strict';

describe('Testing SearchController', function () {
    var searchController, mockedSearchService, deferred, rootScope, $httpBackend;
    //mock Application to allow us to inject our own dependencies
    beforeEach(module('app.search'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, quickSearchService, $q, $rootScope, $templateCache) {

            //declare the controller since we are using controller as we do not need scope
            searchController = $controller('SearchController');
            // init the mock
            mockedSearchService = quickSearchService;
            deferred = $q;
            rootScope = $rootScope;

            // preload the templates so that ui-router will work when it looks for template from state
            $templateCache.put('app/core/404.html','<div>blank or whatever</div>');

        })
    });
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