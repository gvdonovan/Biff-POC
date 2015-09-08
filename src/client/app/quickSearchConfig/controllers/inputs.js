//TODO: DH
(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('InputsController', InputsController);

    InputsController.$inject = ['logger', '$stateParams', '$state', 'inputsService'];
    /* @ngInject */
    function InputsController(logger, $stateParams, $state, inputs) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.next = next;
        vm.previous = previous;

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

        vm.setPreview = setPreview;
        vm.moveRowUp = moveRowUp;
        vm.moveRowDown = moveRowDown;

        activate();

        function activate() {
            logger.info('Activated Inputs View');

            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;

            inputs.getFormConfig().then(function (data) {
                vm.data = data;
                vm.formFields = data.fields;

                var visible = [];
                var order = [];

                for (var i = 0; i < vm.formFields.length; i++) {
                    visible.push(false);
                    order[i] = i;
                }

                vm.formModel.visible = visible;
                vm.formModel.order = order;

            });


        }

        function setPreview(order) {
            var fm = vm.formModel;
            fm.visible[order] = !fm.visible[order];
            console.log("Order: " + order + ", State:" + fm.visible[order]);
            console.log(JSON.stringify(vm.formModel).toString());
        }

        function moveRowUp(index) {
            console.log("UP: Index: " + index);
            var ff = vm.formFields;
            var fo = vm.formModel.order;

            var fItem = ff.slice(0)[index];
            var oItem = fo.slice(0)[index];

            if (index != 0) {
                ff.splice(index, 1);
                ff.splice(index - 1, 0, fItem);
                fo.splice(index, 1);
                fo.splice(index - 1, 0, oItem);
            } else {
                ff.shift();
                ff.push(fItem);
                fo.shift();
                fo.push(oItem);
            }
        }

        function moveRowDown(index) {
            console.log("DOWN: Index: " + index);
            var ff = vm.formFields;
            var fo = vm.formModel.order;

            var fItem = ff.slice(0)[index];
            var oItem = fo.slice(0)[index];

            if (index + 1 != ff.length) {
                ff.splice(index, 1);
                ff.splice(index + 1, 0, fItem);
                fo.splice(index, 1);
                fo.splice(index + 1, 0, oItem);
            } else {
                ff.pop();
                ff.unshift(fItem);
                fo.pop();
                fo.unshift(oItem);
            }
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
