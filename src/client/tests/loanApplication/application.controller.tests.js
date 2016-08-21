'use strict';

describe('Testing applicationController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.loanApplication'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope, $state, $location, $templateCache) {

            var scope = $rootScope.$new();
            controller = $controller('applicationController', {$scope: scope});
            scope.vm = controller;
            deferred = $q;
            rootScope = $rootScope;
        })
    });

    beforeEach(function() {
        // preload the templates so that ui-router will work when it looks for template from state
        $templateCache.put('app/loanApplication/views/application.html', '<div>blank or whatever</div>');
        $templateCache.put('app/loanApplication/views/partials/gettingStarted.html', '<div>blank or whatever</div>'); 
    });

    // tests start here

    it('should be created successfully', function () {
        expect(controller).to.be.defined;
    });
    
    it('should define nextStep', function () {
        expect(controller.nextStep).to.be.defined;
    });
    
    it('should define previousStep', function () {
        expect(controller.previousStep).to.be.defined;
    });
    
    it('should define finish', function () {
        expect(controller.finish).to.be.defined;
    });
    
    it('should set the title to 1003 Loan App', function () {
        expect(controller.title).to.equal('1003 Loan App');
    });
    
    it('should set steps to an array', function () {
        expect(controller.steps).to.be.an('array');
    });
    
    it('should set the initial step index to 0', function () {
        expect(controller.step).to.equal(0);
    });
    
    it('should set isFirstStep to true', function () {
        expect(controller.isFirstStep).to.equal(true);
    });
    
    it('should set isLastStep to false', function () {
        expect(controller.isLastStep).to.equal(false);
    });
    
    it('should set the inital step to the first step', function () {
        expect(controller.activeStep).to.equal(controller.steps[0]);
    });
    
    it('should go to the next step when nextStep is called', function () {
        var spy = sinon.spy($state, 'go');
        controller.step = 0;
        controller.nextStep();
        expect(spy).to.have.been.calledOnce.and.calledWith('loanApplication.' + controller.steps[1]);
    });
    
    it('should go to the previous step when previousStep is called', function () {
        var spy = sinon.spy($state, 'go');
        controller.step = controller.steps.length - 1;
        controller.previousStep();
        expect(spy).to.have.been.calledOnce.and.calledWith('loanApplication.' + controller.steps[controller.steps.length - 2]);
    });
    
    it('set isFirstStep to true when step = 0', function () {
        controller.step = 0;
        expect(controller.isFirstStep).to.equal(true);
    });
    
    it('set isLastStep to true when step = steps.length -1', function () {
        controller.step = controller.steps.length -1;
        $rootScope.$digest();
        expect(controller.isLastStep).to.equal(true);
    });
});