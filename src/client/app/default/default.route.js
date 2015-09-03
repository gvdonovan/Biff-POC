(function () {
    'use strict';

    angular
        .module('app.default')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'default',
                config: {
                    url: '/default',
                    templateUrl: 'app/default/views/default.html',
                    controller: 'DefaultController',
                    controllerAs: 'vm',
                    title: 'Default',
                    settings: {
                        group: 'Default',
                        top: true,
                        nav: 2,
                        content: '<i class="fa fa-check-square-o"></i> Default'
                    }
                }
            }
        ];
        return states;
    }
})();
