(function () {
    'use strict';

    angular
        .module('app.preview')
        .factory('previewService', PreviewService);

    PreviewService.$inject = ['$q', 'logger'];

    function PreviewService($q, logger) {
        var service = {
            getFormConfig: getFormConfig,
            getResults: getResults
        };

        var previewFormConfig = null;

        return service;

        function getFormConfig() {
            var deferred = $q.defer();
            if(previewFormConfig == null)
            {
                previewFormConfig = init();
            }
            deferred.resolve(previewFormConfig);
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

        function init(){
            var data = {
                fields: [
                    {
                        key: 'occupancy',
                        type: 'select',
                        templateOptions: {
                            label: 'Occupancy',
                            options: [
                                {
                                    label: 'Owner Occupied',
                                    id: 'owner_occupied'
                                },
                                {
                                    label: 'Other',
                                    id: 'other'
                                },
                                {
                                    label: 'Biff',
                                    id: 'biff'
                                },
                            ],
                            "valueProp": 'id',
                            "labelProp": 'label',
                            order: 0
                        },
                        hideExpression:'model.visible[0]'
                    },
                    {
                        key: 'propertyType',
                        type: 'select',
                        templateOptions: {
                            label: 'Property Type',
                            options: [
                                {
                                    label: 'Single Family',
                                    value: 'single_family'
                                },
                                {
                                    label: 'PUD',
                                    value: 'pud'
                                },
                                {
                                    label: 'Multi-Family',
                                    value: 'multi_family'
                                },
                                {
                                    label: 'Manufactured / Single Wide',
                                    value: 'manufactured_single_wide'
                                },
                                {
                                    label: 'Manufactured / Double Wide',
                                    value: 'manufactured_double_wide'
                                },
                                {
                                    label: 'Timeshare',
                                    value: 'timeshare'
                                },
                                {
                                    label: 'Condotel',
                                    value: 'condotel'
                                },
                                {
                                    label: 'Non-warrantable Condo',
                                    value: 'non_warrantable_condo'
                                },
                                {
                                    label: 'Modular',
                                    value: 'modular'
                                },
                            ],
                            valueProp: 'value',
                            labelProp: 'label',
                            required: false,
                            order: 1
                        },
                        hideExpression:'model.visible[1]'
                    },
                    {
                        key: 'loanPurpose',
                        type: 'input',
                        templateOptions: {
                            label: 'Loan Purpose',
                            type: 'text',
                            required: false,
                            order: 2
                        },
                        hideExpression:'model.visible[2]'
                    },
                    {
                        key: 'purchasePrice',
                        type: 'input',
                        templateOptions: {
                            label: 'Purchase Price',
                            type: 'number',
                            placeholder: '0.00',
                            addonLeft: {
                                text: '$'
                            },
                            required: false,
                            order: 3
                        },
                        hideExpression:'model.visible[3]'
                    },
                    {
                        key: 'downPayment',
                        type: 'input',
                        templateOptions: {
                            label: 'Down Payment',
                            type: 'number',
                            placeholder: '0.00',
                            addonLeft: {
                                text: '$'
                            },
                            required: false,
                            order: 4
                        },
                        hideExpression:'model.visible[4]'
                    },
                    {
                        key: 'zip',
                        type: 'input',
                        templateOptions: {
                            label: 'Zip',
                            type: 'text',
                            required: false,
                            order: 5
                        },
                        hideExpression:'model.visible[5]'
                    },
                    {
                        key: 'creditScore',
                        type: 'input',
                        templateOptions: {
                            label: 'Credit Score',
                            type: 'text',
                            required: false,
                            order: 6
                        },
                        hideExpression:'model.visible[6]'
                    }
                ]
            };
            return data;
        }
    }
})();