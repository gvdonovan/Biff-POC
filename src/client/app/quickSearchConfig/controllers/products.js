(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['logger', '$stateParams', '$state', '$rootScope', 'spaConfig'];
    /* @ngInject */
    function ProductsController(logger, $stateParams, $state, $rootScope, spaConfig) {
        var vm = this;
        vm.editMode = false;
        vm.formId = null;
        vm.clientId = null;

        vm.state = '';
        vm.go = go;
        vm.cancel = cancel;
        vm.save = save;
        $rootScope.isDirty = false;

        vm.filters = {};

        vm.addPrice = addPrice;
        vm.removePrice = removePrice;

        vm.filterText = '';
        vm.availableProducts = [];
        vm.pickedProducts = [];
        vm.preview = null;
        vm.buildPricingFromPar = buildPricingFromPar;
        vm.buildPreview = buildPreview;

        vm.moveItem = moveItem;
        vm.moveCategory = moveCategory;
        vm.selectItem = selectItem;
        vm.selectedIndex = null;
        vm.itemUp = itemUp;
        vm.itemDown = itemDown;
        vm.removeItem = removeItem;
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
            quickSearchConfigService.getFilters(vm.clientId, vm.formId).then(function (data) {
                vm.clientId = data.clientId;
                vm.data = data;
                vm.filters = vm.data.data.filters;
                vm.filters.rateBelowPar = -1 * Math.abs(vm.filters.rateBelowPar);
                vm.availableProducts = vm.data.data.productCategories.$values;
                vm.pickedProducts = vm.data.data.filters.productFilters.$values;
                _.each(vm.availableProducts, function (item) {
                    _.each(item.products.$values, function (prod) {
                        if (_.where(vm.pickedProducts, {
                                productId: prod.productId
                            }).length > 0) {
                            prod.picked = true;
                        }
                    });
                });
                updateOrder(vm.pickedProducts);
                buildPreview();

                $scope.$watch('vm.filters.rateBelowPar', function (newVal, oldVal) {
                    if (vm.filters.pricingMethod === 2 && oldVal != newVal) {
                        buildPricingFromPar();
                    }
                });

                $scope.$watch('vm.filters.rateAbovePar', function (newVal, oldVal) {
                    if (vm.filters.pricingMethod === 2 && oldVal != newVal) {
                        buildPricingFromPar();
                    }
                });
            });
        }

        function buildPricingFromPar() {
            var prices = _.clone(vm.filters.prices.$values);
            vm.filters.prices.$values = [];
            if (vm.filters.rateAbovePar < 0) {
                vm.filters.rateAbovePar = 0;
            }
            if (vm.filters.rateBelowPar > 0) {
                vm.filters.rateBelowPar = 0;
            }

            for (var i = vm.filters.rateBelowPar; i < 0; i++) {
                var x = _.clone(prices[0]);
                x.id = 0;
                x.price = 100 + i;
                vm.filters.prices.$values.push(x);
            }

            var t = _.clone(prices[0]);
            t.id = 0;
            t.price = 100;
            vm.filters.prices.$values.push(t);

            for (var z = 1; z <= vm.filters.rateAbovePar; z++) {
                var p = _.clone(prices[0]);
                p.id = 0;
                p.price = 100 + z;
                vm.filters.prices.$values.push(p);
            }
            $rootScope.isDirty = true;
            buildPreview();
        }

        function buildPreview() {
            var items = _.clone(vm.pickedProducts);
            items = items.sort(function (obj1, obj2) {
                return obj1.sortOrder - obj2.sortOrder;
            });
            _.each(items, function (item) {
                item.products = [];
                item.products = _.clone(vm.filters.prices.$values);
            });
            vm.preview = items;
        }

        function addPrice() {
            if (vm.filters.prices.$values.length < 10) {
                if (vm.filters.prices.$values.length > 0) {
                    var price = _.clone(vm.filters.prices.$values[0]);
                    price.id = 0;
                    price.price = 0;
                    vm.filters.prices.$values.push(price);
                }
            }
            $rootScope.isDirty = true;
            buildPreview();
        }

        function moveCategory(cat) {
            var itemIds = _.pluck(vm.pickedProducts, 'productId');
            _.each(cat.products.$values, function (item) {
                if (!_.contains(itemIds, item.id)) {
                    move(item);
                }
            });
            updateOrder(vm.pickedProducts);
            buildPreview();
        }

        function moveItem(item) {
            var itemIds = _.pluck(vm.pickedProducts, 'productId');
            if (!_.contains(itemIds, item.productId)) {
                move(item);
            }
            updateOrder(vm.pickedProducts);
            buildPreview();
        }

        function move(item) {
            var newItem = _.clone(item);
            newItem.selected = false;
            item.picked = true;
            vm.pickedProducts.push(newItem);
            updateOrder(vm.pickedProducts);
            $rootScope.isDirty = true;
        }

        function selectItem(item) {
            _.each(vm.pickedProducts, function (x) {
                x.selected = false;
            });
            item.selected = true;
            vm.selectedIndex = item.sortOrder;
        }

        function removePrice(index) {
            if (vm.filters.prices.$values.length > 1) {
                vm.filters.prices.$values.splice(index, 1);
                $rootScope.isDirty = true;
                buildPreview();
            }
        }

        function itemUp() {
            for (var i = 0; i < vm.pickedProducts.length; i++) {
                if (vm.pickedProducts[i].selected) {
                    var num = i - 1;
                    if ((num <= vm.pickedProducts.length - 1) && num >= 0) {
                        vm.pickedProducts[i] = vm.pickedProducts.splice(num, 1, vm.pickedProducts[i])[0];
                        $rootScope.isDirty = true;
                    }
                    break;
                }
            }
            updateOrder(vm.pickedProducts);
            buildPreview();
        }

        function itemDown() {
            for (var i = 0; i < vm.pickedProducts.length; i++) {
                if (vm.pickedProducts[i].selected) {
                    var num = i + 1;
                    if ((num <= vm.pickedProducts.length - 1) && num >= 0) {
                        vm.pickedProducts[i] = vm.pickedProducts.splice(num, 1, vm.pickedProducts[i])[0];
                        $rootScope.isDirty = true;
                    }
                    break;
                }
            }
            updateOrder(vm.pickedProducts);
            buildPreview();
        }

        function removeItem() {
            for (var i = 0; i < vm.pickedProducts.length; i++) {
                if (vm.pickedProducts[i].selected) {
                    var x = vm.pickedProducts.splice(i, 1);
                    unPickItem(x[0]);
                    $rootScope.isDirty = true;
                }
            }
            updateOrder(vm.pickedProducts);
            vm.selectedIndex = null;
            buildPreview();
        }

        function updateOrder(list) {
            for (var i = 0; i < list.length; i++) {
                list[i].sortOrder = i;
                if (list[i].selected) {
                    vm.selectedIndex = i;
                }
            }
        }

        function filterCategory(category) {
            if (vm.filterText === undefined || vm.filterText.length < 3) {
                return true;
            }
            var found = false;
            if (category.name.indexOf(vm.filterText) > -1) {
                found = true;
            }
            _.each(category.products.$values, function (item) {
                if (item.productName.indexOf(vm.filterText) > -1) {
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
                if (item.productName.indexOf(vm.filterText) > -1) {
                    found = true;
                }
                var catCheck = false;

                _.forEach(cat.$values, function (obj) {
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
            _.each(vm.availableProducts, function (cat) {
                _.each(cat.products.$values, function (x) {
                    if (x.productId === item.productId) {
                        x.picked = false;
                        return true;
                    }
                });
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
            vm.data.data.productCategories.$values = vm.availableProducts;
            vm.data.data.filters.productFilters.$values = vm.pickedProducts;
        }

        function navigationUrl() {
            return spaConfig.spaFolder + 'app/quickSearchConfig/views/partials/navigation.html';
        }

        function wizardButtonsUrl() {
            return spaConfig.spaFolder + 'app/quickSearchConfig/views/partials/wizardButtons.html';
        }
    }
})();
