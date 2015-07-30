(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiPopoverController', ObuiPopoverController);
  
    ObuiPopoverController.$inject = [];
      
    // Datepicker
    /* @ngInject */
    function ObuiPopoverController() {
      
        var vm = this;  
      
        vm.dynamicPopover = {
          content: 'Hello, World!',
          templateUrl: 'myPopoverTemplate.html',
          title: 'Title'
        };
      
    }
    
  
})();