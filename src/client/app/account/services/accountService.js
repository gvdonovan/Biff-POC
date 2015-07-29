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

            var newAccount = new Account(data.name, data.phone, data.fax, data.site, data.address1, data.address2, data.city, data.zip);

            deferred.resolve(newAccount);
            return deferred.promise;
        }

        function getAccountInJson(){
            var account ={
                name: 'Biff Tanner',
                phone: '111.111.1111',
                fax: '222.222.2222',
                site: 'BiffTheTanner.com',
                address1: '101 Biff Street',
                address2: 'TX',
                city: 'Future',
                zip: '77777'
            };

            return account;
        }
    }
})();