(function () {
    'use strict';

    angular
        .module('app.tester')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'formTester',
                config: {
                    url: '/formTester',
                    params: {},
                    templateUrl: 'app/tester/views/tester.html',
                    controller: 'FormTesterController',
                    controllerAs: 'vm',
                    title: 'Tester',
                    settings: {
                        group: 'Tester',
                        top: true,
                        nav: 3,
                        content: '<i class="fa fa-check-circle"></i> Form Tester'
                    }
                }
            }
        ];
        return states;
    }
})();
