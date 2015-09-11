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
                            discPoints: 1875.00,
                            apr: 3.996,
                            months: 360,
                            payment: 1411.00,
                            closingCost: 4675.00,
                            rebate: 0.00
                        },
                        {
                            rate: 4,
                            discPoints: 1700.00,
                            apr: 3.999,
                            months: 360,
                            payment: 1511.00,
                            closingCost: 3075.00,
                            rebate: 10.00
                        },
                        {
                            rate: 4.2,
                            discPoints: 1500.00,
                            apr: 4.100,
                            months: 360,
                            payment: 1611.00,
                            closingCost: 500.00,
                            rebate: 500.00
                        },
                        {
                            rate: 3.875,
                            discPoints: 1875.00,
                            apr: 3.996,
                            months: 360,
                            payment: 1411.00,
                            closingCost: 4675.00,
                            rebate: 90.00
                        },
                        {
                            rate: 4,
                            discPoints: 1700.00,
                            apr: 3.999,
                            months: 360,
                            payment: 1511.00,
                            closingCost: 3075.00,
                            rebate: 620.00
                        },
                        {
                            rate: 4.2,
                            discPoints: 1500.00,
                            apr: 4.100,
                            months: 360,
                            payment: 1611.00,
                            closingCost: 500.00,
                            rebate: 750.00
                        }
                    ]
                },
                {
                    title: 'Conforming 15 Yr Fixed',
                    items: [
                        {
                            rate: 3.875,
                            discPoints: 1875.00,
                            apr: 3.996,
                            months: 360,
                            payment: 1411.00,
                            closingCost: 4675.00,
                            rebate: 90.00
                        },
                        {
                            rate: 4,
                            discPoints: 1700.00,
                            apr: 3.999,
                            months: 360,
                            payment: 1511.00,
                            closingCost: 3075.00,
                            rebate: 620.00
                        },
                        {
                            rate: 4.2,
                            discPoints: 1500.00,
                            apr: 4.100,
                            months: 360,
                            payment: 1611.00,
                            closingCost: 500.00,
                            rebate: 750.00
                        }
                    ]
                },
                {
                    title: 'Conforming 5/1 ARM',
                    items: [
                        {
                            rate: 3.875,
                            discPoints: 1875.00,
                            apr: 3.996,
                            months: 360,
                            payment: 1411.00,
                            closingCost: 4675.00,
                            rebate: 0.00
                        },
                        {
                            rate: 4,
                            discPoints: 1700.00,
                            apr: 3.999,
                            months: 360,
                            payment: 1511.00,
                            closingCost: 3075.00,
                            rebate: 10.00
                        },
                        {
                            rate: 4.2,
                            discPoints: 1500.00,
                            apr: 4.100,
                            months: 360,
                            payment: 1611.00,
                            closingCost: 500.00,
                            rebate: 875.00
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
                        key: 'propertyType',
                        type: 'select',
                        templateOptions: {
                            label: 'Rate',
                            options: [
                                {
                                    label: 'Single Family',
                                    value: 'single_family',
                                    visible: true
                                },
                                {
                                    label: 'PUD',
                                    value: 'pud',
                                    visible: true
                                },
                                {
                                    label: 'Multi-Family',
                                    value: 'multi_family',
                                    visible: true
                                },
                                {
                                    label: 'Manufactured / Single Wide',
                                    value: 'manufactured_single_wide',
                                    visible: true
                                },
                                {
                                    label: 'Manufactured / Double Wide',
                                    value: 'manufactured_double_wide',
                                    visible: true
                                },
                                {
                                    label: 'Timeshare',
                                    value: 'timeshare',
                                    visible: true
                                },
                                {
                                    label: 'Condotel',
                                    value: 'condotel',
                                    visible: true
                                },
                                {
                                    label: 'Non-warrantable Condo',
                                    value: 'non_warrantable_condo',
                                    visible: true
                                },
                                {
                                    label: 'Modular',
                                    value: 'modular',
                                    visible: true
                                },
                            ],
                            valueProp: 'value',
                            labelProp: 'label',
                            required: false,
                            order: 1,
                            visible: true
                        }
                    },
                    {
                        key: 'loanPurpose',
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
                        key: 'purchasePrice',
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
                        key: 'downPayment',
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
                        key: 'zip',
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
                        key: 'creditScore',
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
                        key: 'creditScore',
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
