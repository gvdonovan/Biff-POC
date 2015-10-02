(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'spaFolder'];
    /* @ngInject */
    function appRun(routerHelper, spaFolder) {
        routerHelper.configureStates(getStates(spaFolder));
    }

    function getStates(spaFolder) {

        var states = [
            {
                state: 'quickSearchConfig',
                config: {
                    url: '/quickSearchConfig',
                    params: {},
                    templateUrl: spaFolder + 'app/quickSearchConfig/views/formList.html',
                    controller: 'FormListController',
                    controllerAs: 'vm',
                    title: 'Forms',
                    settings: {
                        group: 'QuickSearchConfig',
                        top: true,
                        nav: 1,
                        content: '<i class="fa fa-search"></i> Quick Search'
                    }
                }
            },
            {
                state: 'quickSearchConfigGeneral',
                config: {
                    url: '/quickSearchConfig/general/:formId/:editMode',
                    params: {
                        editMode: 'false'
                    },
                    templateUrl: spaFolder + 'app/quickSearchConfig/views/general.html',
                    controller: 'QSConfigGeneralController',
                    controllerAs: 'vm',
                    title: 'Form General'
                }
            },
            {
                state: 'quickSearchConfigInputs',
                config: {
                    url: '/quickSearchConfig/inputs/:formId/:editMode',
                    params: {
                        editMode: 'false'
                    },
                    templateUrl: spaFolder + 'app/quickSearchConfig/views/inputs.html',
                    controller: 'InputsController',
                    controllerAs: 'vm',
                    title: 'Form Inputs'
                }
            },
            {
                state: 'quickSearchConfigDefaults',
                config: {
                    url: '/quickSearchConfig/defaults/:formId/:editMode',
                    params: {
                        editMode: 'false'
                    },
                    templateUrl: spaFolder + 'app/quickSearchConfig/views/defaults.html',
                    controller: 'DefaultsController',
                    controllerAs: 'vm',
                    title: 'Form Defaults'
                }
            },
            {
                state: 'quickSearchConfigProducts',
                config: {
                    url: '/quickSearchConfig/products/:formId/:editMode',
                    params: {
                        editMode: 'false'
                    },
                    templateUrl: spaFolder + 'app/quickSearchConfig/views/products.html',
                    controller: 'ProductsController',
                    controllerAs: 'vm',
                    title: 'Form Products'
                }
            },
            {
                state: 'quickSearchConfigLoanOfficers',
                config: {
                    url: '/quickSearchConfig/loanOfficers/:formId/:editMode',
                    params: {
                        editMode: 'false'
                    },
                    templateUrl: spaFolder + 'app/quickSearchConfig/views/loanOfficers.html',
                    controller: 'LoanOfficersController',
                    controllerAs: 'vm',
                    title: 'Form defaults'
                }
            },
            {
                state: 'quickSearchConfigResults',
                config: {
                    url: '/quickSearchConfig/results/:formId/:editMode',
                    params: {
                        editMode: 'false'
                    },
                    templateUrl: spaFolder + 'app/quickSearchConfig/views/results.html',
                    controller: 'QSConfigResultsController',
                    controllerAs: 'vm',
                    title: 'Form Results'
                }
            },
            {
                state: 'quickSearchPreview',
                config: {
                    url: '/quickSearchConfig/preview/:formId/:editMode',
                    params: {
                        editMode: 'false'
                    },
                    templateUrl: spaFolder + 'app/quickSearchConfig/views/preview.html',
                    controller: 'QuickSearchPreviewController',
                    controllerAs: 'vm',
                    title: 'Preview'
                }
            }
        ];
        return states;
    }
})();
