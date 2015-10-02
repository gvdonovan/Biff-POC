(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('LoanOfficersController', LoanOfficersController);

    LoanOfficersController.$inject = ['logger', '$stateParams', '$state', '$rootScope', 'quickSearchConfigService', 'spaFolder'];
    /* @ngInject */
    function LoanOfficersController(logger, $stateParams, $state, $rootScope, quickSearchConfigService, spaFolder) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.clientId = null;

        vm.state = '';
        vm.go = go;
        vm.cancel = cancel;
        vm.save = save;
        $rootScope.isDirty = false;

        vm.filterText = '';
        vm.availableOfficers = [];
        vm.pickedOfficers = [];

        vm.moveCategory = moveCategory;
        vm.moveItem = moveItem;
        vm.selectItem = selectItem;
        vm.removeItem = removeItem;
        vm.refreshPicked = refreshPicked;
        vm.filterCategory = filterCategory;
        vm.filterItems = filterItems;

        vm.navigationUrl = navigationUrl;
        vm.wizardButtonsUrl = wizardButtonsUrl;

        activate();

        function activate() {
            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;
            initialize();
        }

        function initialize() {
            quickSearchConfigService.getLoanOfficers(31, vm.formId).then(function (data) {
                vm.clientId = data.clientId;
                vm.data = data;
                vm.availableOfficers = data.data.availableLoanOfficers.$values;
                vm.pickedOfficers = data.data.assignedLoanOfficers.$values;

                _.each(vm.availableOfficers, function (cat) {
                    _.each(cat.loanOfficers.$values, function (person) {
                        person['fullName'] = person.loanOfficerFirstName + ' ' + person.loanOfficerLastName;
                        if (_.where(vm.pickedOfficers, {
                                loanOfficerId: person.loanOfficerId
                            }).length > 0) {
                            person.picked = true;
                        }
                    });
                });

                _.each(vm.pickedOfficers, function (person) {
                    person['fullName'] = person.loanOfficerFirstName + ' ' + person.loanOfficerLastName;
                });
            });
        }

        function moveCategory(cat) {
            var itemIds = _.pluck(vm.pickedOfficers, 'loanOfficerId');
            _.each(cat.loanOfficers.$values, function (item) {
                if (!_.contains(itemIds, item.loanOfficerId)) {
                    move(item);
                }
            });
        }

        function moveItem(item) {
            var itemIds = _.pluck(vm.pickedOfficers, 'loanOfficerId');
            if (!_.contains(itemIds, item.loanOfficerId)) {
                move(item);
            }
        }

        function move(item) {
            var newItem = _.clone(item);
            newItem.selected = false;
            item.picked = true;
            vm.pickedOfficers.push(newItem);
            $rootScope.isDirty = true;
        }

        function selectItem(item) {
            _.each(vm.pickedOfficers, function (x) {
                x.selected = false;
            });
            item.selected = true;
        }

        function removeItem() {
            for (var i = 0; i < vm.pickedOfficers.length; i++) {
                if (vm.pickedOfficers[i].selected) {
                    var x = vm.pickedOfficers.splice(i, 1);
                    unPickItem(x[0]);
                    $rootScope.isDirty = true;
                }
            }
            vm.selectedIndex = null;
        }

        function refreshPicked() {
            vm.pickedOfficers = [];
            var items = _.flatten(_.pluck(_.pluck(vm.availableOfficers, 'loanOfficers'), '$values'));
            _.each(items, function (x) {
                x.picked = false;
            });
            $rootScope.isDirty = true;
        }

        function filterCategory(category) {
            if (vm.filterText === undefined || vm.filterText.length < 3) {
                return true;
            }
            var found = false;
            var catName = category.name.toLowerCase();
            if (catName.indexOf(vm.filterText.toLowerCase()) > -1) {
                found = true;
            }
            _.each(category.loanOfficers.$values, function (item) {
                var fullName = item.fullName.toLowerCase();
                if (fullName.indexOf(vm.filterText.toLowerCase()) > -1) {
                    found = true;
                    return null;
                }
            });

            return found;
        }

        function filterItems(cat) {
            return function (item) {
                if (vm.filterText === undefined || vm.filterText.length < 3) {
                    return true;
                }
                var found = false;
                var fullName = item.fullName.toLowerCase();
                if (fullName.indexOf(vm.filterText.toLowerCase()) > -1) {
                    found = true;
                }
                var catName = cat.name.toLowerCase();
                if (catName.indexOf(vm.filterText.toLowerCase()) > -1) {
                    found = true;
                }
                return found;
            }
        }

        function unPickItem(item) {
            var items = _.flatten(_.pluck(_.pluck(vm.availableOfficers, 'loanOfficers'), '$values'));
            _.each(items, function (x) {
                if (x.loanOfficerId === item.loanOfficerId) {
                    x.picked = false;
                    return true;
                }
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

        function cancel() {
            initialize();
            $rootScope.isDirty = false;
        }

        function save() {
            vm.data.data.availableLoanOfficers.$values = vm.availableOfficers;
            vm.data.data.assignedLoanOfficers.$values = vm.pickedOfficers;

            quickSearchConfigService.postLoanOfficers(vm.data).then(function (data) {
                $rootScope.isDirty = false;
            });
        }

        function navigationUrl() {
            return spaFolder + 'app/quickSearchConfig/views/partials/navigation.html';
        }

        function wizardButtonsUrl() {
            return spaFolder + 'app/quickSearchConfig/views/partials/wizardButtons.html';
        }
    }
})();
