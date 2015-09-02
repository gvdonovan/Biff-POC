'use strict';

describe('Testing PreviewController', function () {
    var previewController, mockedPreviewService, deferred, rootScope;
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app.preview'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function ($controller, _previewService_, $q, _$rootScope_) {

        //declare the controller since we are using controller as we do not need scope
        previewController = $controller('PreviewController');
        // init the mock
        mockedPreviewService = _previewService_;
        deferred = $q;
        rootScope = _$rootScope_;

    }));
    // tests start here
    it('should have a title of Preview', function () {
        //create a watcher on the getResults method of the service and call through the promise
        expect(previewController.title).toBe('Preview');
    });

    it('getResults should have been called', function () {
        //create a watcher on the getResults method of the service, and call through the promise
        spyOn(mockedPreviewService, 'getResults').and.callThrough();
        previewController.submit();
        rootScope.$digest();//needed for expect to work correctly
        expect(mockedPreviewService.getResults).toHaveBeenCalled();
    });
});