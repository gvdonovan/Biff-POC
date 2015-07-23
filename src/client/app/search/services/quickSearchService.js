(function () {
    'use strict';

    angular
        .module('app.search')
        .factory('quickSearchService', quickSearchService);

    quickSearchService.$inject = ['$q', 'logger'];

    function quickSearchService($q, logger) {
        var service = {
            getFormConfig: getFormConfig,
            getResults: getResults
        };
        
        return service;

        function getFormConfig() {
            var deferred = $q.defer();
            var data = {
                schema: {
                    type: "object",
                    properties: {
                        occupancy: {
                            type: "string",
                            default: "Owner Occupied"
                        },
                        propertyType: {
                            type: "string",
                            default: "Single Family"
                        },
                        loanPurpose: {
                            type: "string"
                        },
                        purchasePrice: {
                            type: "number"
                        },
                        downPayment: {
                            type: "number"
                        },
                        zip: {
                            type: "string"
                        },
                        creditScore: {
                            type: "string",
                            default: "740-779"
                        }
                    },
                    required: ["occupancy", "purchasePrice", "loanPurpose"]
                },
                form: [
                    {
                        key: "occupancy",
                        type: "select",
                        title: "Occupancy",
                        titleMap: [
                            {value: "Owner Occupied", name: "Owner Occupied"},
                            {value: "Other", name: "Other"},
                            {value: "Biff", name: "Biff"}
                        ]
                    },
                    {
                        key: "propertyType",
                        type: "select",
                        title: "Property Type",
                        titleMap: [
                            {value: "Single Family", name: "Single Family"},
                            {value: "PUD", name: "PUD"},
                            {value: "Multi-Family", name: "Multi-Family"},
                            {value: "Manufactured / Single Wide", name: "Manufactured / Single Wide"},
                            {value: "Manufactured / Double Wide", name: "Manufactured / Double Wide"},
                            {value: "Timeshare", name: "Timeshare"},
                            {value: "Condotel", name: "Condotel"},
                            {value: "Non-warrantable Condo", name: "Non-warrantable Condo"},
                            {value: "Modular", name: "Modular"},
                        ]
                    },
                    {
                        key: "loanPurpose",
                        title: "Loan Purpose",
                        disableSuccessState: true,
                        feedback: false
                    },
                    {
                        key: "purchasePrice",
                        title: "Purchase Price",
                        placeholder: "0.00",
                        validationMessages: {
                            'minCheck': 'Bob is not OK! You here me?'
                        },
                        $validators: {
                            minCheck: function (value) {
                                var bool = true;
                                if (value < 0) {
                                    bool = false;
                                }
                                return bool;
                            }
                        },
                        feedback: false
                    }

                ]
            };
            deferred.resolve(data);
            return deferred.promise;
        }

        function getResults(criteria) {
            var deferred = $q.defer();
            if (criteria !== null) {
                var data = getMockedResults();
                deferred.resolve(data);
            }
            else {
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
                },
                {
                    title: 'Conforming 3/1 ARM',
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
                            rebate: 220.00
                        }
                    ]
                }
            ];

            return results;
        }
    }
})();