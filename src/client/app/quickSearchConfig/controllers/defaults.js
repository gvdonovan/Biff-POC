//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('DefaultsController', DefaultsController);

    DefaultsController.$inject = ['$scope', '$rootScope', '$stateParams', '$state', 'quickSearchConfigService', 'spaFolder'];
    /* @ngInject */
    function DefaultsController($scope, $rootScope, $stateParams, $state, quickSearchConfigService, spaFolder) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.state = '';
        vm.go = go;
        vm.next = next;
        vm.previous = previous;
        vm.save = save;
        vm.cancel = cancel;
        vm.isLoading = false;
        $rootScope.isDirty = false;
        vm.formState = {
            defaultsForm: {}
        };

        vm.toggleSections = toggleSections;
        vm.sectionsOpen = false;

        vm.model = {};

        vm.fields = [];

        vm.navigationUrl = navigationUrl;
        vm.wizardButtonsUrl = wizardButtonsUrl;

        activate();

        $scope.$watch('vm.formState.defaultsForm.$dirty', function (newVal, oldVal) {
            if (!_.isUndefined(newVal)) {
                if (newVal) {
                    $rootScope.isDirty = true;
                }
            }
        });

        function activate() {
            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;
            initialize();
        }

        function initialize() {
            vm.model = {};
            quickSearchConfigService.getDefaults(vm.clientId, vm.formId).then(function (data) {
                vm.clientId = data.clientId;
                vm.formId = data.formId;
                vm.fields = data.form.pages.$values[0].fields.$values;
                vm.model = nest(data.data, vm.fields);
                _.each(vm.fields, function (field) {
                    if (field.type == 'nested') {
                        field.data.fields = field.data.fields.$values;
                        _.each(field.data.fields, function (item) {
                            if (item.type === 'select' || item.type === 'radio') {
                                item.templateOptions.options = item.templateOptions.options.$values;
                            }
                        });
                    } else if (field.type === 'select' || field.type === 'radio') {
                        field.templateOptions.options = field.templateOptions.options.$values;
                    }
                });
            });
        }

        function toggleSections() {
            vm.sectionsOpen = !vm.sectionsOpen;
            _.each(vm.fields, function (field) {
                field.templateOptions.open = vm.sectionsOpen;
            });
        }

        function go(state) {
            if (vm.editMode.toLowerCase() == 'true') {
                $state.go(state, {
                    editMode: vm.editMode,
                    formId: vm.formId
                });
            }
        }

        function next() {
            $state.go('quickSearchConfigProducts', {
                editMode: vm.editMode,
                formId: vm.formId
            });
        }

        function previous() {
            $state.go('quickSearchConfigInputs', {
                editMode: vm.editMode,
                formId: vm.formId
            });
        }

        function cancel() {
            initialize();
            vm.formState.defaultsForm.$setPristine(true);
            $rootScope.isDirty = false;
        }

        function save() {
            var flatData = {};
            flatData = flatten(vm.model, {}, false);
            quickSearchConfigService.postDefaults(vm.clientId, vm.formId, flatData).then(function (data) {
                vm.formState.defaultsForm.$setPristine(true);
                $rootScope.isDirty = false;
            });
        }

        function flatten(x, result, prefix) {
            if (_.isObject(x)) {
                _.each(x, function (v, k) {
                    flatten(v, result, k)
                })
            } else {
                result[prefix] = x
            }
            return result
        }

        function nest(model, fields) {
            var nestedModel = {};
            var keysAdded = [];
            _.each(fields, function (x) {
                if (x.type == 'nested') {
                    _.each(x.data.fields.$values, function (nest) {
                        if (!nestedModel.hasOwnProperty(x.key)) {
                            nestedModel[x.key] = {};
                        }
                        if (model.hasOwnProperty(nest.key)) {
                            nestedModel[x.key][nest.key] = model[nest.key];
                            keysAdded.push(nest.key);
                        }
                    });
                }
            });
            for (var p in model) {
                if (!nestedModel.hasOwnProperty(p) && !_.contains(keysAdded, p)) {
                    nestedModel[p] = model[p];
                }
            }
            return nestedModel;
        }

        function navigationUrl() {
            return spaFolder + 'app/quickSearchConfig/views/partials/navigation.html';
        }

        function wizardButtonsUrl() {
            return spaFolder + 'app/quickSearchConfig/views/partials/wizardButtons.html';
        }
    }
})();
