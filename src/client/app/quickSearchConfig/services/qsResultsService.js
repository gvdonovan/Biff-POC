(function () {
    'use strict';

    angular
        .module('app.quickSearchConfig')
        .factory('qsResultsService', QSResultsService);

    QSResultsService.$inject = ['$q', 'logger'];

    function QSResultsService($q, logger) {
        var service = {
            getFormConfig: getFormConfig,
            getResults: getResults
        };

        var resultsFormConfig = null;

        return service;

        function getFormConfig() {
            var deferred = $q.defer();
            if (resultsFormConfig == null) {
                resultsFormConfig = init();
            }
            deferred.resolve(resultsFormConfig);
            return deferred.promise;
        }

        function getResults(criteria) {
            var deferred = $q.defer();
            if (criteria !== null) {
                var data = getMockedResults();
                deferred.resolve(data);
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }

        ////////////////////// Privates

        function getMockedResults() {
            var results = [
                {
                    title: 'Conforming 30 Yr Fixed',
                    items: [
                        {
                            rate: 3.875,
                            discounts: 1875.00,
                            aPR: 3.996,
                            months: 360,
                            monthlyPayments: 1411.00,
                            closingCosts: 4675.00,
                            apply: 0.00
                        },
                        {
                            rate: 4,
                            discounts: 1700.00,
                            aPR: 3.999,
                            months: 360,
                            monthlyPayments: 1511.00,
                            closingCosts: 3075.00,
                            apply: 10.00
                        },
                        {
                            rate: 4.2,
                            discounts: 1500.00,
                            aPR: 4.100,
                            months: 360,
                            monthlyPayments: 1611.00,
                            closingCosts: 500.00,
                            apply: 500.00
                        },
                        {
                            rate: 3.875,
                            discounts: 1875.00,
                            aPR: 3.996,
                            months: 360,
                            monthlyPayments: 1411.00,
                            closingCosts: 4675.00,
                            apply: 90.00
                        },
                        {
                            rate: 4,
                            discounts: 1700.00,
                            aPR: 3.999,
                            months: 360,
                            monthlyPayments: 1511.00,
                            closingCosts: 3075.00,
                            apply: 620.00
                        },
                        {
                            rate: 4.2,
                            discounts: 1500.00,
                            aPR: 4.100,
                            months: 360,
                            monthlyPayments: 1611.00,
                            closingCosts: 500.00,
                            apply: 750.00
                        }
                    ]
                },
                {
                    title: 'Conforming 15 Yr Fixed',
                    items: [
                        {
                            rate: 3.875,
                            discounts: 1875.00,
                            aPR: 3.996,
                            months: 360,
                            monthlyPayments: 1411.00,
                            closingCosts: 4675.00,
                            apply: 90.00
                        },
                        {
                            rate: 4,
                            discounts: 1700.00,
                            aPR: 3.999,
                            months: 360,
                            monthlyPayments: 1511.00,
                            closingCosts: 3075.00,
                            apply: 620.00
                        },
                        {
                            rate: 4.2,
                            discounts: 1500.00,
                            aPR: 4.100,
                            months: 360,
                            monthlyPayments: 1611.00,
                            closingCosts: 500.00,
                            apply: 750.00
                        }
                    ]
                },
                {
                    title: 'Conforming 5/1 ARM',
                    items: [
                        {
                            rate: 3.875,
                            discounts: 1875.00,
                            aPR: 3.996,
                            months: 360,
                            monthlyPayments: 1411.00,
                            closingCosts: 4675.00,
                            apply: 0.00
                        },
                        {
                            rate: 4,
                            discounts: 1700.00,
                            aPR: 3.999,
                            months: 360,
                            monthlyPayments: 1511.00,
                            closingCosts: 3075.00,
                            apply: 10.00
                        },
                        {
                            rate: 4.2,
                            discounts: 1500.00,
                            aPR: 4.100,
                            months: 360,
                            monthlyPayments: 1611.00,
                            closingCosts: 500.00,
                            apply: 875.00
                        }
                    ]
                }
                //,
                //{
                //    title: 'Conforming 3/1 ARM',
                //    items: [
                //        {
                //            rate: 3.875,
                //            discPoints: 1875.00,
                //            apr: 3.996,
                //            months: 360,
                //            payment: 1411.00,
                //            closingCost: 4675.00,
                //            rebate: 0.00
                //        },
                //        {
                //            rate: 4,
                //            discPoints: 1700.00,
                //            apr: 3.999,
                //            months: 360,
                //            payment: 1511.00,
                //            closingCost: 3075.00,
                //            rebate: 10.00
                //        },
                //        {
                //            rate: 4.2,
                //            discPoints: 1500.00,
                //            apr: 4.100,
                //            months: 360,
                //            payment: 1611.00,
                //            closingCost: 500.00,
                //            rebate: 220.00
                //        }
                //    ]
                //}
            ];

            return results;
        }

        function init() {
            var data = {
                fields: [
                    {
                        key: 'rate',
                        type: 'input',
                        templateOptions: {
                            label: 'Rate',
                            type: 'text',
                            required: false,
                            order: 2,
                            visible: true
                        }
                    },
                    {
                        key: 'discPoints',
                        type: 'input',
                        templateOptions: {
                            label: 'Discount Points',
                            type: 'text',
                            required: false,
                            order: 2,
                            visible: true
                        }
                    },
                    {
                        key: 'apr',
                        type: 'input',
                        templateOptions: {
                            label: 'APR',
                            type: 'number',
                            placeholder: '0.00',
                            addonLeft: {
                                text: '$'
                            },
                            required: false,
                            order: 3,
                            visible: true
                        }
                    },
                    {
                        key: 'months',
                        type: 'input',
                        templateOptions: {
                            label: 'Months',
                            type: 'number',
                            placeholder: '0.00',
                            addonLeft: {
                                text: '$'
                            },
                            required: false,
                            order: 4,
                            visible: true
                        }
                    },
                    {
                        key: 'payment',
                        type: 'input',
                        templateOptions: {
                            label: 'Payment',
                            type: 'text',
                            required: false,
                            order: 5,
                            visible: true
                        }
                    },
                    {
                        key: 'closingCost',
                        type: 'input',
                        templateOptions: {
                            label: 'Closing Costs',
                            type: 'text',
                            required: false,
                            order: 6,
                            visible: true
                        }
                    },
                    {
                        key: 'rebate',
                        type: 'input',
                        templateOptions: {
                            label: 'Rebate',
                            type: 'text',
                            required: false,
                            order: 6,
                            visible: true
                        }
                    }
                ]
            };
            return data;
        }
    }
})();
