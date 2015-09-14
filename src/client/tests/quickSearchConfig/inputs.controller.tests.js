'use strict';

describe('Testing InputsController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.quickSearchConfig'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function () {
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope, $state, $location, $templateCache, $stateParams) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('InputsController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    beforeEach(function () {
        // preload the templates so that ui-router will work when it looks for template from state
        $templateCache.put('app/quickSearchConfig/views/inputs.html', '<div>blank or whatever</div>');
        $templateCache.put('app/quickSearchConfig/views/formList.html', '<div>blank or whatever</div>');
        $templateCache.put('app/quickSearchConfig/views/defaults.html', '<div>blank or whatever</div>');

    });

    // tests start here
    it('should be created successfully', function () {
        expect(controller).to.be.defined;
    });

    it('should be defined', function () {
        expect(controller.editMode).to.equal($stateParams.editMode);
    });

    it('should initially set editMode to $stateParams.editMode', function () {
        expect(controller.editMode).to.equal($stateParams.editMode);
    });

    it('should initially set formId to $stateParams.formId', function () {
        expect(controller.formId).to.equal($stateParams.formId);
    });

    it('should initially set state to an empty string', function () {
        expect(controller.state).to.equal('');
    });

    it('should initially set title to Inputs', function () {
        expect(controller.title).to.equal('Inputs');
    });

    it('should initially set header to Quick Search', function () {
        expect(controller.header).to.equal('Quick Search');
    });

    it('should initially set footer to an empty string', function () {
        expect(controller.footer).to.equal('');
    });

    it('should initially set footer to an empty string', function () {
        expect(controller.footer).to.equal('');
    });

    it('should initially set isLoading to false', function () {
        expect(controller.isLoading).to.be.false;
    });

    it('should initially set searchResults to an array', function () {
        expect(controller.searchResults).to.be.an('array');
    });

    it('should initially set formModel to an empty object', function () {
        expect(controller.formModel).to.be.an('object');
    });

    it('should initially set formFields to an array', function () {
        expect(controller.formFields).to.be.an('array');
    });

    it('should initially set previewModel to an object', function () {
        expect(controller.previewModel).to.be.an('object');
    });

    it('should initially set previewFields to an array', function () {
        expect(controller.previewFields).to.be.an('array');
    });

    it('should initially set optionsVisible to an array', function () {
        expect(controller.optionsVisible).to.be.an('array');
    });

    //go
    it('should have go be defined', function () {
        expect(controller.go).to.be.defined;
    });

    it('should change state to quickSearchConfigs when go function is called and editMode is true', function () {
        controller.editMode = true;
        controller.go('quickSearchConfigDefaults');
        $rootScope.$apply();
        expect($state.current.name).to.equal('quickSearchConfigDefaults');

    });

    it('should not change state when go function is called and editMode is false', function () {
        var spy = sinon.spy($state, 'go');
        controller.editMode = false;
        controller.go('quickSearchConfigDefaults');
        $rootScope.$apply();
        expect(spy).to.not.have.been.called;
    });

    //next
    it('should have next be defined', function () {
        expect(controller.next).to.be.defined;
    });

    it('should change state to quickSearchConfigDefaults when next function is called', function () {
        var spy = sinon.spy($state, 'go');
        controller.next();
        $rootScope.$apply();
        expect(spy).to.have.been.calledOnce.and.calledWith('quickSearchConfigDefaults', {
            editMode: controller.editMode,
            formId: controller.formId
        });
    });

    //previous
    it('should have previous be defined', function () {
        expect(controller.previous).to.be.defined;
    });

    it('should change state to quickSearchConfig when previous function is called', function () {
        controller.previous();
        $rootScope.$apply();
        expect($state.current.name).to.equal('quickSearchConfig');
    });

    //submit
    it('should have submit be defined', function () {
        expect(controller.submit).to.be.defined;
    });

    //setPreview
    it('should have setPreview be defined', function () {
        expect(controller.setPreview).to.be.defined;
    });

    it('should set the preview visible by index', function () {
        controller.formFields = [
            {
                templateOptions: {
                    visible: true
                }
          }
        ];
        var index = 0;
        var current = controller.formFields[index].templateOptions.visible;
        controller.setPreview(index);
        expect(controller.formFields[index].templateOptions.visible).to.equal(!current);
    });

    //moveRowUp
    it('should have moveRowUp be defined', function () {
        expect(controller.moveRowUp).to.be.defined;
    });

    //moveRowDown
    it('should have moveRowDown be defined', function () {
        expect(controller.moveRowDown).to.be.defined;
    });

    //toggleOptions
    it('should have toggleOptions be defined', function () {
        expect(controller.toggleOptions).to.be.defined;
    });

    //updatePreview
    it('should have updatePreview be defined', function () {
        expect(controller.updatePreview).to.be.defined;
    });
});
