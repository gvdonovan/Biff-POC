//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.tester')
        .controller('FormTesterController', FormTesterController);

    FormTesterController.$inject = ['$scope', '$rootScope', '$stateParams', '$state', 'testerService'];
    /* @ngInject */
    function FormTesterController($scope, $rootScope, $stateParams, $state, testerService) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.biff = false;
        vm.pageNumber = 0;
        vm.availablePages = [];
        vm.initialize = initialize;
        vm.updateTitle = updateTitle;
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

        activate();

        function activate() {
            //initialize();
        }

        function initialize() {
            vm.model = {};
            testerService.getSection(vm.formId, vm.biff).then(function (data) {
                vm.data = data;
                for(var i = 0; i < data.pages.$values.length; i++){
                    vm.availablePages.push(i);
                }
                vm.fields = data.pages.$values[vm.pageNumber].fields.$values;
                vm.model = nest(data.data, vm.fields);
                _.each(vm.fields, function (field) {
                    field.data.fields = field.data.fields.$values;
                    _.each(field.data.fields, function (item) {
                        if (item.type === 'select' || item.type === 'radio') {
                            item.templateOptions.options = item.templateOptions.options.$values;
                        }
                    });
                });
                updateTitle();
            });
        }

        function updateTitle(){
            vm.title = vm.data.pages.$values[vm.pageNumber].name;
            vm.fields = [];
            vm.fields = vm.data.pages.$values[vm.pageNumber].fields.$values;
        }

        function toggleSections() {
            vm.sectionsOpen = !vm.sectionsOpen;
            _.each(vm.fields, function (field) {
                field.templateOptions.open = vm.sectionsOpen;
            });
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

        function cancel() {
            initialize();
            vm.formState.defaultsForm.$setPristine(true);
            $rootScope.isDirty = false;
        }

        function save() {
            var flatData = {};
            flatData = flatten(vm.model, {}, false);
            testerService.postDefaults(vm.clientId, vm.formId, flatData).then(function (data) {
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
            for(var p in model){
                if(!nestedModel.hasOwnProperty(p) && !_.contains(keysAdded, p)){
                    nestedModel[p] = model[p];
                }
            }
            return nestedModel;
        }
    }
})();