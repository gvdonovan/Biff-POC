(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiCollapseController', ObuiCollapseController);
  
    ObuiCarouselController.$inject = [];
      
    // Collapse
    /* @ngInject */
    function ObuiCollapseController() {
      
        var vm = this;  
      
        vm.isCollapsed = false;
      
    }
  
})();