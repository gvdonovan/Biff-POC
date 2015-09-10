'use strict';

describe('Testing PreviewController', function () {
    var previewController, mockedPreviewService, deferred, rootScope, $httpBackend;
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app.preview'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function ($controller, _previewService_, $q, _$rootScope_, $httpBackend) {

        //declare the controller since we are using controller as we do not need scope
        previewController = $controller('PreviewController');
        // init the mock
        mockedPreviewService = _previewService_;
        deferred = $q;
        rootScope = _$rootScope_;
        
        // set up expected http requests
        $httpBackend.whenGET('app/core/404.html').respond(404);
    }));
    // tests start here
    it('should have a title of Preview', function () {
        //create a watcher on the getResults method of the service and call through the promise
        expect(previewController.title).to.equal('Preview');
    });

    it('getResults should have been called', function () {
        //create a watcher on the getResults method of the service, and call through the promise
        sinon.spy(mockedPreviewService, 'getResults');
        previewController.submit();
        rootScope.$apply();//needed for expect to work correctly
        expect(mockedPreviewService.getResults).to.have.been.calledOnce;
    });
});