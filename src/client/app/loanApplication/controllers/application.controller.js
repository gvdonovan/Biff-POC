(function () {
    'use strict';

    angular
        .module('app.loanApplication')
        .controller('applicationController', ApplicationController);

    ApplicationController.$inject = ['logger', '$state', '$scope'];
    /* @ngInject */
    function ApplicationController(logger, $state, $scope) {
        var vm = this;
        vm.title = '1003 Loan App';
        vm.page1 = 'This is Page 1';
        vm.page2 = 'This is Page 2';
        vm.page3 = 'This is Page 3';
        vm.activeState = 'page1';

        vm.loanApp = {
            firstName: '',
            lastName: '',
            email: '',
            street: '',
            city: '',
            zip: '',
            state: '',
            creditScore: 0,
            loanAmount: 0.00,
            reason: ''
        };

        vm.steps = ['page1', 'page2', 'page3'];
        vm.step = 0;
        vm.nextStep = nextStep;
        vm.previousStep = previousStep;
        vm.finish = finish;
        vm.isLastStep = false;
        vm.isFirstStep = true;

        activate();

        function activate() {
            logger.info('Activated Application View');
            goStep();
        }

        function getCurrentStep() {
            return vm.steps[vm.step];
        }

        function goStep() {
            vm.step = (vm.step > (vm.steps.length - 1)) ? vm.steps.length - 1 : vm.step;
            vm.step = (vm.step < 0 ) ? 0 : vm.step;
            $state.go('loanApplication.' + getCurrentStep());
            vm.activeState = getCurrentStep();
        }

        function nextStep(steps) {
            vm.step += (steps == undefined || steps == null) ? 1 : steps;
            goStep();
        }

        function previousStep(steps) {
            vm.step -= (steps == undefined || steps == null) ? 1 : steps;
            goStep();
        }

        function finish(){
            console.log('Finish was clicked');
        }

        $scope.$watch(angular.bind(vm, function (obj) {
            return obj.vm.step;
        }), function (newVal) {
            vm.isLastStep = (newVal == (vm.steps.length - 1));
            vm.isFirstStep = (newVal == 0);
        });
    }
})();
