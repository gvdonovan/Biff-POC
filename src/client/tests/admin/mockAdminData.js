/*jshint maxlen:120 */
/*jshint -W079 */
var mockAdminData = {
    selectCategoryData: {
        "category": "category1",
        "selected": false,
        "sortOrder": 0,
        "items": [
            {
                "id": 1,
                "name": "item1",
                "selected": false,
                "picked": false,
                "sortOrder": 1,
                "$$hashKey": "object:30"
            },
            {
                "id": 2,
                "name": "item2",
                "selected": false,
                "picked": false,
                "sortOrder": 1,
                "$$hashKey": "object:31"
            }
        ],
        "$$hashKey": "object:16"
    },
    selectCategoryDataExpected: {
        "category": "category1",
        "selected": true,
        "sortOrder": 0,
        "items": [
            {
                "id": 1,
                "name": "item1",
                "selected": true,
                "picked": false,
                "sortOrder": 1,
                "$$hashKey": "object:30"
            },
            {
                "id": 2,
                "name": "item2",
                "selected": true,
                "picked": false,
                "sortOrder": 1,
                "$$hashKey": "object:31"
            }
        ],
        "$$hashKey": "object:16"
    },
    mockList2: [{
        "category": "category1",
        "selected": false,
        "sortOrder": 0,
        "items": [
            {
                "id": 1,
                "name": "item1",
                "selected": false,
                "picked": false,
                "sortOrder": 1,
                "$$hashKey": "object:30"
            }]},
        {
            "category": "category2",
            "selected": false,
            "sortOrder": 0,
            "items": [
                {
                    "id": 1,
                    "name": "item1",
                    "selected": false,
                    "picked": false,
                    "sortOrder": 1,
                    "$$hashKey": "object:30"
                }]}
    ],
    removeItemData: [{
        "category": "category1",
        "selected": true,
        "sortOrder": 0,
        "items": [
            {
                "id": 1,
                "name": "item1",
                "selected": true,
                "picked": false,
                "sortOrder": 1,
                "$$hashKey": "object:30"
            },
            {
                "id": 2,
                "name": "item2",
                "selected": true,
                "picked": false,
                "sortOrder": 1,
                "$$hashKey": "object:31"
            }
        ],
        "$$hashKey": "object:16"
    }],
    sortItemData: [{
        "category": "category1",
        "selected": true,
        "sortOrder": 0,
        "items": [
            {
                "id": 1,
                "name": "item1",
                "selected": true,
                "picked": false,
                "sortOrder": 1,
                "$$hashKey": "object:30"
            },
            {
                "id": 2,
                "name": "item2",
                "selected": true,
                "picked": false,
                "sortOrder": 1,
                "$$hashKey": "object:31"
            }
        ],
        "$$hashKey": "object:16"
    }]

};