(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiCarouselController', ObuiCarouselController);
  
    ObuiCarouselController.$inject = [];
      
    // Carousel
    /* @ngInject */
    function ObuiCarouselController() {
      
        var vm = this;  
      
        vm.myInterval = 500;
        vm.noWrapSlides = false;
        vm.slides = [];
        vm.addSlide = function() {
          var newWidth = 600 + vm.slides.length + 1;
          vm.slides.push({
            image: '//placekitten.com/' + newWidth + '/300',
            text: ['More','Extra','Lots of','Surplus'][vm.slides.length % 4] + ' ' +
              ['Cats', 'Kittys', 'Felines', 'Cutes'][vm.slides.length % 4]
          });
        };
        for (var i=0; i<4; i++) {
          vm.addSlide();
        }
      
    }
  
})();