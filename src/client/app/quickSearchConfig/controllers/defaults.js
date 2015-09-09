//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('DefaultsController', DefaultsController);

    DefaultsController.$inject = ['logger', '$stateParams', '$state'];
    /* @ngInject */
    function DefaultsController(logger, $stateParams, $state) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.go = go;
        vm.next = next;
        vm.previous = previous;

        vm.model = {};

        vm.fields = [
            {
                key: 'searchCriteria',
                type: 'nested',
                templateOptions: {
                    label: 'First Lien Search Criteria',
                    open: true
                },
                data: {
                    fields: [
                        {
                            className: "col-xs-3",
                            key: 'interest',
                            type: 'select',
                            templateOptions: {
                                type: 'select',
                                label: 'Interest Only',
                                options:[
                                    {
                                        label: 'Yes',
                                        value: 1
                                    },
                                    {
                                        label: 'No',
                                        value: 0
                                    }

                                ]
                            }
                        },
                        {
                            className: "col-xs-3",
                            key: 'buydown',
                            type: 'select',
                            templateOptions: {
                                type: 'select',
                                label: 'Buydown',
                                options:[
                                    {
                                        label: 'None',
                                        value: 0
                                    },
                                    {
                                        label: '20 Percent',
                                        value: 1
                                    }

                                ]
                            }
                        }
                    ]
                }
            }
        ];

        activate();

        function activate() {
            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;
        }

        function go(state) {
            if (vm.editMode.toLowerCase() == 'true') {
                $state.go(state, {editMode: vm.editMode, formId: vm.formId});
            }
        }

        function next() {
            $state.go('quickSearchConfigProducts', {editMode: vm.editMode, formId: vm.formId});
        }

        function previous() {
            $state.go('quickSearchConfigInputs', {editMode: vm.editMode, formId: vm.formId});
        }
    }
})();