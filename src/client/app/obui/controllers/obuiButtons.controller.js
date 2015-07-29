(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiButtonsController', ObuiButtonsController);
  
    ObuiButtonsController.$inject = [];
      
    // Alert
    /* @ngInject */
    function ObuiButtonsController() {
      
        var vm = this;  
      
        vm.singleModel = 1;

        vm.radioModel = 'Middle';

        vm.checkModel = {
          left: false,
          middle: true,
          right: false
        };        
      
    }
  
})();