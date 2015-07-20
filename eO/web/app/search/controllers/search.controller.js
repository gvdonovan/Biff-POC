(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['logger', '$state', 'routerHelper'];
    /* @ngInject */
    function SearchController(logger, $state, routerHelper) {
        var vm = this;
        vm.title = 'Search';

        activate();

        function activate() {
            logger.info('Activated search View');
        }
    }
})();