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

            var newAccount = new Account(data);

            deferred.resolve(newAccount);
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