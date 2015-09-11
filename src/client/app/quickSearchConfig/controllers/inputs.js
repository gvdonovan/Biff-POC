//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('InputsController', InputsController);

    InputsController.$inject = ['logger', '$stateParams', '$state', 'quickSearchConfigService'];
    /* @ngInject */
    function InputsController(logger, $stateParams, $state, quickSearchConfigService) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.go = go;
        vm.next = next;
        vm.previous = previous;
        vm.state = '';

        vm.title = 'Inputs';
        vm.header = "Quick Search";
        vm.footer = "";
        vm.submit = submit;
        vm.isLoading = false;
        vm.showJson = false;
        vm.json = "";
        vm.searchResults = [];
        vm.underScoreJson = "";
        vm.formModel = {};
        vm.formFields = [];
        vm.previewModel = {};
        vm.previewFields = [];
        vm.optionsVisible = [];

        vm.setPreview = setPreview;
        vm.moveRowUp = moveRowUp;
        vm.moveRowDown = moveRowDown;
        vm.toggleOptions = toggleOptions;
        vm.updatePreview = updatePreview;

        activate();

        function activate() {
            logger.info('Activated Inputs View');

            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;

            quickSearchConfigService.getInputs().then(function (data) {
                vm.data = data;
                vm.formFields = jQuery.extend(true, [], data.fields);

                vm.updatePreview();

                var visible = [];
                var order = [];

                for (var i = 0; i < vm.formFields.length; i++) {
                    visible.push(false);
                    order[i] = i;
                    vm.optionsVisible[i] = false;
                }

                vm.formModel.visible = visible;
                vm.formModel.order = order;


            });


        }

        function setPreview(index) {
            vm.formFields[index].templateOptions.visible = !vm.formFields[index].templateOptions.visible;
            console.log("Index: " + index + ", visible:" + vm.formFields[index].templateOptions.visible);
            vm.updatePreview();
        }

        function moveRowUp(index) {
            console.log("UP: Index: " + index);
            var ff = vm.formFields;
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
            }
            vm.updatePreview();
        }

        function moveRowDown(index) {
            console.log("DOWN: Index: " + index);
            var ff = vm.formFields;
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
            }
            vm.updatePreview();
        }

        function updatePreview() {
            var ff = vm.formFields;
            var pf = vm.previewFields = [];

            for (var i = 0; i < ff.length; i++) {
                var pItem = {};
                angular.copy(ff[i], pItem);
                if (pItem.templateOptions.visible == true) {
                    if (pItem.templateOptions.options) {

                        var options = _.clone(pItem.templateOptions.options);

                        var newOptions = [];
                        for (var j = 0; j < options.length; j++) {

                            var optionsItem = _.clone(options[j]);
                            if (optionsItem.visible == true) {
                                newOptions.push(optionsItem);
                            }
                        }

                        pItem.templateOptions.options = newOptions;
                        console.log(ff[0].templateOptions.options);
                    }
                    pf.push(pItem);
                }
            }

            console.log(ff[0].templateOptions.options);
            console.log(pf.length);
        }

        function toggleOptions(index) {
            vm.optionsVisible[index] = !vm.optionsVisible[index];
        }

        function submit() {
            vm.isLoading = true;
            return preview.getResults(vm.formModel).then(function (data) {
                vm.searchResults = data;
                vm.json = JSON.stringify(vm.formModel, null, 4);
                vm.showJson = true;
                vm.underScoreJson = underScoreFilter();
                $timeout(function () {
                    vm.isLoading = false;
                }, 500);
            });
        }

        function underScoreFilter() {
            var biff = _.pluck(vm.searchResults, 'items');
            var flat = _.flatten(biff);
            var x = _.filter(flat, function (item) {
                return item.rebate >= 500;
            });
            return x;
        }

        function go(state) {
            if (vm.editMode) {
                $state.go(state, {
                    editMode: vm.editMode,
                    formId: vm.formId
                });
            }
        }

        function next() {
            $state.go('quickSearchConfigDefaults', {
                editMode: vm.editMode,
                formId: vm.formId
            });
        }

        function previous() {
            $state.go('quickSearchConfig');
        }
    }
})();
