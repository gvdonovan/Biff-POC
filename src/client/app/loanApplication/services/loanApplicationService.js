(function () {
    'use strict';

    angular
        .module('app.loanApplication')
        .service('loanApplicationService', LoanApplicationService);

    LoanApplicationService.$inject = ['$q', 'logger'];

    function LoanApplicationService($q, logger) {
        var service = {
        };

        return service;
    }
})();