/*jshint maxlen:120 */
/*jshint -W079 */
var mockData = (function(){
    return {
        getStates: getStates,
        expectedGetStates: expectedGetStates
    };

    function getStates() {
        return [
            {
                "url": "/login",
                "templateUrl": "app/home/views/login.html",
                "controller": "loginController",
                "controllerAs": "vm",
                "title": "Login",
                "settings": {
                    "group": "home",
                    "top": false,
                    "nav": 99,
                    "content": "<i class=\"fa fa-sign-in\"></i> Login"
                },
                "resolve": {},
                "name": "login"
            },
            {
                "url": "/search?embedded&mode",
                "params": {
                    "embedded": "false",
                    "mode": "init"
                },
                "templateUrl": "app/search/views/search.html",
                "controller": "SearchController",
                "controllerAs": "vm",
                "title": "Search",
                "settings": {
                    "group": "Search",
                    "top": false,
                    "nav": 2,
                    "content": "<i class=\"fa fa-search\"></i> Search"
                },
                "resolve": {},
                "name": "search"
            },
            {
                "url": "/loanApplication",
                "templateUrl": "app/loanApplication/views/application.html",
                "controller": "applicationController",
                "controllerAs": "vm",
                "title": "1003 Application",
                "settings": {
                    "group": "loanApplication",
                    "top": true,
                    "nav": 8,
                    "content": "<i class=\"fa fa-file-text\"></i> 1003"
                },
                "resolve": {},
                "name": "loanApplication"
            },
            {
                "url": "/additional",
                "templateUrl": "app/loanApplication/views/partials/additionalInfo.html",
                "resolve": {},
                "name": "loanApplication.additional"
            },
            {
                "url": "/preview",
                "templateUrl": "app/preview/views/preview.html",
                "controller": "PreviewController",
                "controllerAs": "vm",
                "title": "Preview",
                "settings": {
                    "group": "Preview",
                    "top": false,
                    "nav": 2,
                    "content": "<i class=\"fa fa-check-square-o\"></i> Preview"
                },
                "resolve": {},
                "name": "preview"
            }
        ];
    }

    function expectedGetStates() {
        return [
            {
            "url": "/loanApplication",
            "templateUrl": "app/loanApplication/views/application.html",
            "controller": "applicationController",
            "controllerAs": "vm",
            "title": "1003 Application",
            "settings": {
                "group": "loanApplication",
                "top": true,
                "nav": 8,
                "content": "<i class=\"fa fa-file-text\"></i> 1003"
            },
            "resolve": {},
            "name": "loanApplication"
        }
        ];
    }
})();