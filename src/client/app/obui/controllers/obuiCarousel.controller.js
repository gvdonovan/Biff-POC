(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiCarouselController', ObuiCarouselController);

    ObuiCarouselController.$inject = ['$animate'];

    // Carousel
    /* @ngInject */
    function ObuiCarouselController($animate) {

        var vm = this;

        vm.myInterval = 5000;
        vm.noWrapSlides = false;
        var slides = vm.slides = [];
        vm.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '//placekitten.com/' + newWidth + '/300',
                text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i = 0; i < 4; i++) {
            vm.addSlide();
        }

      // This fixes the bug in the carousel but disables all animations in this setion of the site so I'm leaving it commented out for now.

      // $animate.enabled(false);

    }



})();