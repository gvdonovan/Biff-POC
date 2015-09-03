(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'quickSearchConfig',
                config: {
                    url: '/quickSearchConfig',
                    params: {},
                    templateUrl: 'app/quickSearchConfig/views/formList.html',
                    controller: 'FormListController',
                    controllerAs: 'vm',
                    title: 'Forms',
                    settings: {
                        group: 'QuickSearchConfig',
                        top: true,
                        nav: 9,
                        content: '<i class="fa fa-search"></i> Quick Search Config'
                    }
                }
            },
            {
                state: 'quickSearchConfigInputs',
                config: {
                    url: '/quickSearchConfig/inputs',
                    params: {
                        editMode: false
                    },
                    templateUrl: 'app/quickSearchConfig/views/inputs.html',
                    controller: 'InputsController',
                    controllerAs: 'vm',
                    title: 'Form Inputs'
                }
            },
            {
                state: 'quickSearchConfigDefaults',
                config: {
                    url: '/quickSearchConfig/defaults',
                    params: {
                        editMode: false
                    },
                    templateUrl: 'app/quickSearchConfig/views/defaults.html',
                    controller: 'DefaultsController',
                    controllerAs: 'vm',
                    title: 'Form Defaults'
                }
            },
            {
                state: 'quickSearchConfigProducts',
                config: {
                    url: '/quickSearchConfig/products',
                    params: {
                        editMode: false
                    },
                    templateUrl: 'app/quickSearchConfig/views/products.html',
                    controller: 'ProductsController',
                    controllerAs: 'vm',
                    title: 'Form Products'
                }
            },
            {
                state: 'quickSearchConfigLoanOfficers',
                config: {
                    url: '/quickSearchConfig/loanOfficers',
                    params: {
                        editMode: false
                    },
                    templateUrl: 'app/quickSearchConfig/views/loanOfficers.html',
                    controller: 'LoanOfficersController',
                    controllerAs: 'vm',
                    title: 'Form defaults'
                }
            },
            {
                state: 'quickSearchConfigResults',
                config: {
                    url: '/quickSearchConfig/results',
                    params: {
                        editMode: false
                    },
                    templateUrl: 'app/quickSearchConfig/views/results.html',
                    controller: 'ResultsController',
                    controllerAs: 'vm',
                    title: 'Form Results'
                }
            }
        ];
        return states;
    }
})();
