'use strict';

describe('Testing obuiDatepickerController', function () {
    var controller, deferred, rootScope;

    beforeEach(module('app.obui'));


    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(function(){
        // use bard.js library to make dep. injection easy for unit tests
        bard.inject(function ($controller, $q, $rootScope) {

            //declare the controller since we are using controller as we do not need scope
            controller = $controller('obuiDatepickerController');
            deferred = $q;
            rootScope = $rootScope;

        })
    });

    // tests start here

    it('should set date in calendar to disabled for Saturday and Sunday', function () {
        // NOTE: Sunday is 0 and Saturday is 6 using date.getDay()
        var saturday = new Date('Sat Sep 12 2015 13:00:00 GMT00500');
        var sunday = new Date('Sun Sep 13 2015 13:00:00 GMT00500');
        var monday = new Date('Mon Sep 14 2015 13:00:00 GMT00500');
        var result1 = controller.disabled(saturday, 'day');
        var result2 = controller.disabled(sunday, 'day');
        var result3 = controller.disabled(monday, 'day');
        expect(result1).to.be.true;
        expect(result2).to.be.true;
        expect(result3).to.be.false;
    });

    it('toggleMin method should allow/disallow user to select dates before today', function(){
        controller.minDate = new Date('Sat Sep 12 2015 13:00:00 GMT00500');
        controller.toggleMin();
        expect(controller.minDate).to.equal(null);
        controller.minDate = null;
        controller.toggleMin();
        // just check day because there could be a mismatch between the milliseconds of creating the minDate
        // in controller.toggleMin() and the call to new Date() on the next line
        expect(controller.minDate.getDay()).to.equal(new Date().getDay());
    });

    it('should set vm.opened to true when vm.open method is called', function(){
        // stub out the click event
        var div = document.createElement('div');
        var e = {
            target : div,
            preventDefault: sinon.spy(),
            stopPropagation: sinon.spy()
        };
       controller.opened = false;
       controller.open(e);
       expect(controller.opened).to.be.true;
    });

    // TODO: not sure what the purpose of this method is so. Possibly more needed
    describe('getDayClass method', function(){

        it('should return "" if mode !== day', function(){
           var result = controller.getDayClass(new Date());
           expect(result).to.equal('');
        });


    });






});