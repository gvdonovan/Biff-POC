'use strict';

describe('Testing obuiTypeaheadController', function () {
    var controller, deferred, rootScope, googleMapsReturnedData;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function () {
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope, $httpBackend, $templateCache) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiTypeaheadController');
            deferred = $q;
            rootScope = $rootScope;

            // preload the templates so that ui-router will work when it looks for template from state
            $templateCache.put('app/core/404.html','<div>blank or whatever</div>');


            //return fake data from $httpBackend call to google maps api
            $httpBackend.whenGET('//maps.googleapis.com/maps/api/geocode/json?address=6480&sensor=false').respond('PUT FAKE DATA HER');


        });
    });

    // tests start here

    // TODO: vm.getLocation in controller file should be turned into a promise (using $q) to properly test this




});