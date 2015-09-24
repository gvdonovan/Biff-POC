(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['logger', '$stateParams', '$state', '$rootScope'];
    /* @ngInject */
    function ProductsController(logger, $stateParams, $state, $rootScope) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;

        vm.state = '';
        vm.go = go;
        vm.cancel = cancel;
        vm.save = save;
        $rootScope.isDirty = false;

        vm.pricingFilter = {
            filterType: 'price',
            prices: [{value: 99}, {value: 100}, {value: 101}],
            belowPar: -2,
            abovePar: 2
        };

        vm.addPrice = addPrice;
        vm.removePrice = removePrice;

        vm.filterText = '';
        vm.list1 = buildList();
        vm.pickedItems = [];

        vm.moveItem = moveItem;
        vm.moveCategory = moveCategory;
        vm.selectItem = selectItem;
        vm.removeItem = removeItem;
        vm.filterCategory = filterCategory;
        vm.filterItems = filterItems;

        activate();

        function activate() {
            vm.editMode = $stateParams.editMode;
            vm.formId = $stateParams.formId;
            vm.state = $state.current.name;
        }

        function buildList() {
            var cat = 1;
            var id = 1;
            var arr = [];

            for (var x = 0; x < 3; x++) {
                var items = [];

                for (var y = 0; y < 20; y++) {
                    items.push({
                        id: id,
                        name: 'item' + id,
                        selected: false,
                        picked: false,
                        sortOrder: 1
                    });
                    id = id + 1;
                }

                arr.push({
                    category: 'category' + cat,
                    selected: false,
                    sortOrder: 0,
                    items: items
                });
                cat = cat + 1;
            }
            return arr;
        }

        function addPrice() {
            if (vm.pricingFilter.prices.length < 10) {
                vm.pricingFilter.prices.push({value: 0});
            }
            $rootScope.isDirty = true;
        }

        function moveCategory(cat) {
            var itemIds = _.pluck(vm.pickedItems, 'id');
            _.each(cat.items, function (item) {
                if (!_.contains(itemIds, item.id)) {
                    move(item);
                }
            });
        }

        function moveItem(item) {
            var itemIds = _.pluck(vm.pickedItems, 'id');
            if (!_.contains(itemIds, item.id)) {
                move(item);
            }
        }

        function move(item) {
            var newItem = _.clone(item);
            newItem.selected = false;
            item.picked = true;
            vm.pickedItems.push(newItem);
            $rootScope.isDirty = true;
        }

        function selectItem(item) {
            _.each(vm.pickedItems, function (x) {
                x.selected = false;
            });
            item.selected = true;
        }

        function removePrice(index) {
            vm.pricingFilter.prices.splice(index, 1);
            $rootScope.isDirty = true;
        }

        function itemUp(){

        }

        function removeItem() {
            for (var i = 0; i < vm.pickedItems.length; i++) {
                if (vm.pickedItems[i].selected) {
                    var x = vm.pickedItems.splice(i, 1);
                    unPickItem(x[0]);
                    $rootScope.isDirty = true;
                }
            }
        }

        function filterCategory(category) {
            if (vm.filterText === undefined || vm.filterText.length < 3) {
                return true;
            }
            var found = false;
            if (category.category.indexOf(vm.filterText) > -1) {
                found = true;
            }
            _.each(category.items, function (item) {
                if (item.name.indexOf(vm.filterText) > -1) {
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
                if (item.name.indexOf(vm.filterText) > -1) {
                    found = true;
                }
                var catCheck = false;

                _.forEach(cat.items, function (obj) {
                    if (catCheck) {
                        return null;
                    }
                    if (obj.name.indexOf(vm.filterText) > -1) {
                        catCheck = true;
                    }
                });

                if (!catCheck) {
                    found = true;
                }
                return found;
            }
        }

        function unPickItem(item) {
          var items = _.flatten( _.pluck(vm.list1, 'items'));
            _.each(items, function(x){
               if(x.id === item.id){
                   x.picked = false;
                   return true;
               }
            });
        }

        function go(state) {
            if (vm.editMode.toLowerCase() == 'true') {
                $state.go(state, {editMode: vm.editMode, formId: vm.formId});
            }
        }

        function cancel() {
            $rootScope.isDirty = false;
        }

        function save() {
            //TODO post vm.data
            $rootScope.isDirty = false;
        }
    }
})();
