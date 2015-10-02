(function () {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'spaFolder'];
    /* @ngInject */
    function appRun(routerHelper, spaFolder) {
        routerHelper.configureStates(getStates(spaFolder));
    }

    function getStates(spaFolder) {

        var states = [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: spaFolder + 'app/home/views/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    title: 'E-Originations',
                    settings: {
                        group: 'home',
                        top: false,
                        nav: 2,
                        content: '<i class="fa fa-home"></i> E-Originations'
                    }
                },

            },
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: spaFolder + 'app/home/views/login.html',
                    controller: 'loginController',
                    controllerAs: 'vm',
                    title: 'Login',
                    settings: {
                        group: 'home',
                        top: false,
                        nav: 99,
                        content: '<i class="fa fa-sign-in"></i> Login'
                    }
                }
            },
            {
                state: 'register',
                config: {
                    url: '/register',
                    templateUrl: spaFolder + 'app/home/views/register.html',
                    controller: 'registerController',
                    controllerAs: 'vm',
                    title: 'Register',
                    settings: {
                        group: 'home',
                        top: false,
                        nav: 99
                    }
                }
            }
        ];

        return states;
    }
})();
