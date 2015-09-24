//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('InputsController', InputsController);

    InputsController.$inject = ['logger', '$stateParams', '$state', '$rootScope', 'quickSearchConfigService'];
    /* @ngInject */
    function InputsController(logger, $stateParams, $state, $rootScope, quickSearchConfigService) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;

        vm.go = go;
        vm.state = '';
        vm.cancel = cancel;
        vm.save = save;
        vm.resetForm = resetForm;

        vm.title = 'Inputs';
        vm.header = "";
        vm.footer = "";
        vm.isLoading = false;
        $rootScope.isDirty = false;
        vm.fieldChanged = fieldChanged;
        vm.optionChanged = optionChanged;

        vm.previewModel = {};
        vm.previewFields = [];
        vm.optionsVisible = [];

        vm.setPreview = setPreview;
        vm.moveRowUp = moveRowUp;
        vm.moveRowDown = moveRowDown;
        vm.updatePreview = updatePreview;
        vm.updateOptionDefault = updateOptionDefault;
        vm.closeOptions = closeOptions;
        vm.moveOptionUp = moveOptionUp;
        vm.moveOptionDown = moveOptionDown;

        activate();

        function activate() {
            logger.info('Activated Inputs View');

            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;
            initialize();
        }

        function initialize() {
            quickSearchConfigService.getInputs().then(function (data) {
                vm.data = data;
                vm.updatePreview();
            });
        }

        function fieldChanged(templateOptions) {
            templateOptions.isDirty = true;
            $rootScope.isDirty = true;
        }

        function optionChanged(option) {
            option.isDirty = true;
            $rootScope.isDirty = true;
        }

        function setPreview(index) {
            vm.data.fields.$values[index].templateOptions.visible = !vm.data.fields.$values[index].templateOptions.visible;
            console.log("Index: " + index + ", visible:" + vm.data.fields.$values[index].templateOptions.visible);
            vm.updatePreview();
            $rootScope.isDirty = true;
        }

        function moveRowUp(index) {
            console.log("UP: Index: " + index);
            var ff = vm.data.fields.$values;
            var pf = vm.previewFields;

            var fItem = ff.slice(0)[index];
            var pItem = pf.slice(0)[index];

            if (index != 0) {
                ff.splice(index, 1);
                ff.splice(index - 1, 0, fItem);
                pf.splice(index, 1);
                pf.splice(index - 1, 0, pItem);
            } else {
                ff.shift();
                ff.push(fItem);
                pf.shift();
                pf.push(pItem);
            }
            for (var i = 0; i < ff.length; i++) {
                ff[i].templateOptions.order = i;
                fieldChanged(ff[i].templateOptions);
            }
            vm.updatePreview();
            closeOptions();
        }

        function moveRowDown(index) {
            console.log("DOWN: Index: " + index);
            var ff = vm.data.fields.$values;
            var pf = vm.previewFields;

            var fItem = ff.slice(0)[index];
            var pItem = pf.slice(0)[index];

            if (index + 1 != ff.length) {
                ff.splice(index, 1);
                ff.splice(index + 1, 0, fItem);
                pf.splice(index, 1);
                pf.splice(index + 1, 0, pItem);
            } else {
                ff.pop();
                ff.unshift(fItem);
                pf.pop();
                pf.unshift(pItem);
            }
            for (var i = 0; i < ff.length; i++) {
                ff[i].templateOptions.order = i;
                fieldChanged(ff[i].templateOptions);
            }
            vm.updatePreview();
            closeOptions();
        }

        function updatePreview() {
            var ff = vm.data.fields.$values;
            vm.previewFields = [];

            for (var i = 0; i < ff.length; i++) {
                var pItem = {};
                angular.copy(ff[i], pItem);

                if (pItem.templateOptions.visible == true) {
                    if (pItem.templateOptions.options) {
                        var options = _.clone(pItem.templateOptions.options.$values);

                        var newOptions = [];
                        for (var j = 0; j < options.length; j++) {

                            var optionsItem = _.clone(options[j]);
                            if (optionsItem.visible == true) {
                                newOptions.push(optionsItem);
                            }
                        }

                        pItem.templateOptions.options = newOptions;
                    }
                    vm.previewFields.push(pItem);
                }
            }
        }

        function closeOptions() {
            var ff = vm.data.fields.$values;
            for (var i = 0; i < ff.length; i++) {
                vm.optionsVisible[i] = false;
            }
        }

        function updateOptionDefault(field, option) {
            _.each(field.templateOptions.options.$values, function (item) {
                if (item == option) {
                    field.defaultValue = option.value;
                    vm.previewModel[field.key] = option.value;
                } else {
                    item.selected = false;
                }
            });
            optionChanged(option);
            fieldChanged(field);
            vm.updatePreview();
        }

        function moveOptionUp(field, index) {
            console.log("Option UP: Index: " + index);
            var of = field.templateOptions.options.$values;

            var fItem = of.slice(0)[index];

            if (index != 0) {
                of.splice(index, 1);
                of.splice(index - 1, 0, fItem);
            } else {
                of.shift();
                of.push(fItem);
            }
            for (var i = 0; i < of.length; i++) {
                of[i].order = i;
                optionChanged(of[i]);
            }
            fieldChanged(field.templateOptions);
            vm.updatePreview();
            $rootScope.isDirty = true;
        }

        function moveOptionDown(field, index) {
            console.log("Option DOWN: Index: " + index);
            var of = field.templateOptions.options.$values;

            var fItem = of.slice(0)[index];

            if (index + 1 != of.length) {
                of.splice(index, 1);
                of.splice(index + 1, 0, fItem);
            } else {
                of.pop();
                of.unshift(fItem);
            }
            for (var i = 0; i < of.length; i++) {
                of[i].order = i;
                optionChanged(of[i]);
            }
            fieldChanged(field.templateOptions);
            vm.updatePreview();
            $rootScope.isDirty = true;
        }

        function go(state) {
            if (vm.editMode.toLowerCase() == 'true') {
                $state.go(state, {
                    editMode: vm.editMode,
                    formId: vm.formId
                });
            }
        }

        function resetForm() {
            _.each(vm.data.fields.$values, function (item) {
                item.templateOptions.label = item.templateOptions.defaultLabel;
                item.templateOptions.order = item.templateOptions.defaultOrder;
                item.templateOptions.visible = true;
                if (item.key === 'creditScore') {
                    _.each(item.templateOptions.options.$values, function (option) {
                        //option.label = option.defaultLabel;
                        option.order = option.defaultOrder;
                        option.visible = true;
                    });
                    item.templateOptions.options.$values = item.templateOptions.options.$values.sort(function (obj1, obj2) {
                        return obj1.order - obj2.order;
                    });
                }
            });

            vm.data.fields.$values = vm.data.fields.$values.sort(function (obj1, obj2) {
                return obj1.templateOptions.order - obj2.templateOptions.order;
            });

            $rootScope.isDirty = true;
            vm.updatePreview();
        }

        function cancel() {
            initialize();
            $rootScope.isDirty = false;
        }

        function save() {
            quickSearchConfigService.postInputs(vm.data).then(function (data) {
                $rootScope.isDirty = false;
            });
        }
    }
})();
