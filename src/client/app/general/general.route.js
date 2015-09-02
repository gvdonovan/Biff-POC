(function () {
    'use strict';

    angular
        .module('app.general')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'general',
                config: {
                    url: '/general',
                    templateUrl: 'app/general/views/general.html',
                    controller: 'GeneralController',
                    controllerAs: 'vm',
                    title: 'General',
                    settings: {
                        group: 'General',
                        top: true,
                        nav: 2,
                        content: '<i class="fa fa-check-square-o"></i> General'
                    }
                }
            }
        ];
        return states;
    }
})();
