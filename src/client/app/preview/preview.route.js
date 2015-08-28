(function () {
    'use strict';

    angular
        .module('app.preview')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'preview',
                config: {
                    url: '/preview',
                    templateUrl: 'app/preview/views/preview.html',
                    controller: 'PreviewController',
                    controllerAs: 'vm',
                    title: 'Preview',
                    settings: {
                        group: 'Preview',
                        top: true,
                        nav: 2,
                        content: '<i class="fa fa-check-square-o"></i> Preview'
                    }
                }
            }
        ];
        return states;
    }
})();
