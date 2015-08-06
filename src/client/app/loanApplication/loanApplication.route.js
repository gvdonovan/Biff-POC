(function() {
    'use strict';

    angular
        .module('app.loanApplication')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'loanApplication',
                config: {
                    url: '/loanApplication',
                    templateUrl: 'app/loanApplication/views/application.html',
                    controller: 'applicationController',
                    controllerAs: 'vm',
                    title: '1003 Application',
                    settings: {
                        group: 'loanApplication',
                        top: true,
                        nav: 8,
                        content: '<i class="fa fa-file-text"></i> Loan Application'
                    }
                }
            },
            {
                state: 'loanApplication.page1',
                config:{
                    url:'/page1',
                    templateUrl:'app/loanApplication/views/partials/page1.html'
                }
            },
            {
                state: 'loanApplication.page2',
                config:{
                    url:'/page2',
                    templateUrl:'app/loanApplication/views/partials/page2.html'
                }
            },
            {
                state: 'loanApplication.page3',
                config:{
                    url:'/page3',
                    templateUrl:'app/loanApplication/views/partials/page3.html'
                }
            }
        ];

        return states;
    }
})();
