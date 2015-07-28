(function () {
    'use strict';

    angular
        .module('app.account')
        .service('accountService', AccountService);

    AccountService.$inject = ['$q', 'logger'];

    function AccountService($q, logger) {
        var service = {
            getTransformedAccount: getTransformedAccount
        };

        return service;

        function getTransformedAccount(){
            var deferred = $q.defer();
            var data = getAccountInJson();
            deferred.resolve(data);
            return deferred.promise;
        }

        function getAccountInJson(){
            var account ={
                firstName: 'Biff',
                lastName: 'Tanner',
                age: '30'
            }

            return account;
        }
    }
})();