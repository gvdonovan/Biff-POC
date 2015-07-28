(function () {
    'use strict';

    angular
        .module('app.account')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'account',
                config: {
                    url: '/account',
                    templateUrl: 'app/account/views/account.html',
                    controller: 'accountController',
                    controllerAs: 'vm',
                    title: 'Account',
                    settings: {
                        group: 'Account',
                        top: true,
                        nav: 4,
                        content: '<i class="fa fa-search"></i> Account'
                    }
                }
            }
        ];
        return states;
    }
})();
