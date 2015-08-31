(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('adminController', AdminController);

    AdminController.$inject = ['logger', '$state', 'routerHelper'];
    /* @ngInject */
    function AdminController(logger, $state, routerHelper) {
        var vm = this;
        vm.title = 'Admin';

        vm.list1 = [
            {
                category: 'category 1',
                selected: false,
                sortOrder: 1,
                items: [
                    {id: 1, name: 'item 1', selected: false, sortOrder: 1},
                    {id: 2, name: 'item 2', selected: false, sortOrder: 2},
                    {id: 3, name: 'item 3', selected: false, sortOrder: 3}
                ]
            },
            {
                category: 'category 2',
                selected: false,
                sortOrder: 2,
                items: [
                    {id: 4, name: 'item 1', selected: false, sortOrder: 1},
                    {id: 5, name: 'item 2', selected: false, sortOrder: 2},
                    {id: 6, name: 'item 3', selected: false, sortOrder: 3}
                ]
            },
            {
                category: 'category 3',
                selected: false,
                sortOrder: 3,
                items: [
                    {id: 7, name: 'item 1', selected: false, sortOrder: 1},
                    {id: 8, name: 'biff 2', selected: false, sortOrder: 2},
                    {id: 9, name: 'item 3', selected: false, sortOrder: 3}
                ]
            }
        ];

        vm.filterText = '';
        vm.list2 = [];
        vm.moveRight = moveRight;
        vm.selectCategory = selectCategory;
        vm.removeCategory = removeCategory;
        vm.removeItem = removeItem;
        vm.sortCategory = sortCategory;
        vm.sortItem = sortItem;
        vm.filterCategory = filterCategory;
        vm.filterItems = filterItems;

        function moveRight() {
            //var currentCategory;
            //var itemsToMove = [];
            if (!_.isEmpty(vm.list2)) {
                var selectedCategories = getSelectedCategories();
            }
            //var biff = _.flatten(_.pluck(vm.list1, 'items'));
            //_.each(biff, function (item) {
            //    if (item.selected == true && !_.contains(pickedIds, item.id)) {
            //        var newItem = _.clone(item);
            //        newItem.selected = false;
            //        itemsToMove.push(newItem);
            //    }
            //});
            //vm.list2 = _.union(vm.list2, itemsToMove);

            _.each(vm.list1, function (category) {
                //currentCategory = category;
                _.each(category.items, function (item) {
                    if (item.selected == true) {
                        //if category does not exist add it
                        if (!_.contains(selectedCategories, category.category)) {
                            var newCategory = _.clone(category);
                            newCategory.items = [];
                            newCategory.selected = false;
                            vm.list2.push(newCategory);
                            selectedCategories = getSelectedCategories();
                        }
                        //add selected items to correct category
                        _.each(vm.list2, function (pickedCategory) {
                            var itemIds = _.pluck(pickedCategory.items, 'id');
                            if (pickedCategory.category == category.category && !_.contains(itemIds, item.id)) {
                                var newItem = _.clone(item);
                                newItem.selected = false;
                                pickedCategory.items.push(newItem);
                                return null;
                            }
                        });
                    }
                });
            });

        }

        function selectCategory(category) {
            category.selected = !category.selected;
            _.each(category.items, function (item) {
                item.selected = category.selected;
            });
        }

        function removeCategory(index) {
            vm.list2.splice(index, 1);
        }

        function removeItem(index, category, cIndex) {
            if (category.items.length > 1) {
                category.items.splice(index, 1)
            }
            else {
                vm.list2.splice(cIndex, 1);
            }
        }

        function sortCategory(index, increment) {
            var num = index + increment;
            if ((num <= vm.list2.length - 1) && num >= 0) {
                vm.list2[index] = vm.list2.splice(num, 1, vm.list2[index])[0];
            }
        }

        function sortItem(index, increment, list) {
            var num = index + increment;
            if ((num <= list.length - 1) && num >= 0) {
                list[index] = list.splice(num, 1, list[index])[0];
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

        function filterItems(item) {
            if (vm.filterText === undefined || vm.filterText.length < 3) {
                return true;
            }
            var found = false;
            if (item.name.indexOf(vm.filterText) > -1) {
                found = true;
            }
            return found;
        }

        activate();

        function activate() {
            logger.info('Activated Admin View');
        }

        function getSelectedCategories() {
            return _.pluck(vm.list2, 'category');
        }

    }
})();
