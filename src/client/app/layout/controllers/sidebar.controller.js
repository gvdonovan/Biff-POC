(function() {
    'use strict';

    //TODO: consider removing. this appears to be remnants of Papa's hottowel yoeman generator

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$state', 'routerHelper'];
    /* @ngInject */
    function SidebarController($state, routerHelper) {
        var vm = this;

        activate();

        function activate() { }

    }
})();
