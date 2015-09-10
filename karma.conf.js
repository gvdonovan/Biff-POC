// Karma configuration
// Generated on Tue Sep 09 2015 15:43:57 GMT-0500 (COT)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],


        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/moment/moment.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/toastr/toastr.js',
            'bower_components/angular-scroll/angular-scroll.js',
            'bower_components/underscore/underscore.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-local-storage/dist/angular-local-storage.js',
            'bower_components/es6-shim/es6-shim.js',
            'bower_components/api-check/dist/api-check.js',
            'bower_components/angular-formly/dist/formly.js',
            'bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
            'bower_components/datetimepicker/jquery.datetimepicker.js',
            'bower_components/bootstrap-switch/dist/js/bootstrap-switch.js',
            'bower_components/angular-bootstrap-switch/dist/angular-bootstrap-switch.js',
            'bower_components/sinon/index.js',
            'bower_components/bardjs/dist/bard.js',
            'bower_components/bardjs/dist/bard-ngRouteTester.js',
            // endbower

            // app files get loaded from gulp inject
            // inject:js
            "src/client/app/app.module.js",
            "src/client/app/obInclude.js",
            "src/client/app/account/account.module.js",
            "src/client/app/account/account.route.js",
            "src/client/app/admin/admin.module.js",
            "src/client/app/admin/admin.route.js",
            "src/client/app/core/config.js",
            "src/client/app/core/constants.js",
            "src/client/app/core/core.module.js",
            "src/client/app/core/core.route.js",
            "src/client/app/core/dataservice.js",
            "src/client/app/default/default.module.js",
            "src/client/app/default/default.route.js",
            "src/client/app/directives/common.js",
            "src/client/app/directives/forms.js",
            "src/client/app/home/home.module.js",
            "src/client/app/home/home.route.js",
            "src/client/app/layout/layout.module.js",
            "src/client/app/loanApplication/loanApplication.module.js",
            "src/client/app/loanApplication/loanApplication.route.js",
            "src/client/app/obui/obui.module.js",
            "src/client/app/obui/obui.route.js",
            "src/client/app/preview/preview.module.js",
            "src/client/app/preview/preview.route.js",
            "src/client/app/quickSearchConfig/quickSearchConfig.module.js",
            "src/client/app/quickSearchConfig/quickSearchConfig.route.js",
            "src/client/app/results/results.module.js",
            "src/client/app/results/results.route.js",
            "src/client/app/search/search.module.js",
            "src/client/app/search/search.route.js",
            "src/client/app/account/controllers/account.controller.js",
            "src/client/app/account/controllers/accounts.controller.js",
            "src/client/app/account/services/accountService.js",
            "src/client/app/admin/controllers/admin.controller.js",
            "src/client/app/default/controllers/default.controller.js",
            "src/client/app/default/services/defaultService.js",
            "src/client/app/home/controllers/home.controller.js",
            "src/client/app/home/controllers/login.controller.js",
            "src/client/app/home/controllers/register.controller.js",
            "src/client/app/home/services/authInterceptorService.js",
            "src/client/app/home/services/authService.js",
            "src/client/app/layout/controllers/nav.controller.js",
            "src/client/app/layout/controllers/shell.controller.js",
            "src/client/app/layout/controllers/sidebar.controller.js",
            "src/client/app/loanApplication/controllers/application.controller.js",
            "src/client/app/loanApplication/services/loanApplicationService.js",
            "src/client/app/blocks/exception/exception-handler.provider.js",
            "src/client/app/blocks/exception/exception.js",
            "src/client/app/blocks/exception/exception.module.js",
            "src/client/app/blocks/forms/forms.js",
            "src/client/app/blocks/forms/forms.module.js",
            "src/client/app/blocks/logger/logger.js",
            "src/client/app/blocks/logger/logger.module.js",
            "src/client/app/blocks/router/router-helper.provider.js",
            "src/client/app/blocks/router/router.module.js",
            "src/client/app/obui/controllers/obui.controller.js",
            "src/client/app/obui/controllers/obuiAccordion.controller.js",
            "src/client/app/obui/controllers/obuiAlert.controller.js",
            "src/client/app/obui/controllers/obuiButtons.controller.js",
            "src/client/app/obui/controllers/obuiCarousel.controller.js",
            "src/client/app/obui/controllers/obuiCollapse.controller.js",
            "src/client/app/obui/controllers/obuiDatepicker.controller.js",
            "src/client/app/obui/controllers/obuiDropdown.controller.js",
            "src/client/app/obui/controllers/obuiModal.controller.js",
            "src/client/app/obui/controllers/obuiPagination.controller.js",
            "src/client/app/obui/controllers/obuiPopover.controller.js",
            "src/client/app/obui/controllers/obuiProgressbar.controller.js",
            "src/client/app/obui/controllers/obuiRating.controller.js",
            "src/client/app/obui/controllers/obuiTabs.controller.js",
            "src/client/app/obui/controllers/obuiTimepicker.controller.js",
            "src/client/app/obui/controllers/obuiTooltip.controller.js",
            "src/client/app/obui/controllers/obuiTypeahead.controller.js",
            "src/client/app/preview/controllers/preview.controller.js",
            "src/client/app/preview/services/previewService.js",
            "src/client/app/quickSearchConfig/controllers/defaults.js",
            "src/client/app/quickSearchConfig/controllers/formList.js",
            "src/client/app/quickSearchConfig/controllers/inputs.js",
            "src/client/app/quickSearchConfig/controllers/loanOfficers.js",
            "src/client/app/quickSearchConfig/controllers/products.js",
            "src/client/app/quickSearchConfig/controllers/results.js",
            "src/client/app/quickSearchConfig/services/inputsService.js",
            "src/client/app/results/controllers/results.controller.js",
            "src/client/app/results/services/resultsService.js",
            "src/client/app/search/controllers/search.controller.js",
            "src/client/app/search/services/quickSearchService.js",
            // endinject

            // lib helpers
            'src/client/lib/**/*.js',

            // test files
            'src/client/tests/**/*.js'

        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        'plugins' : [
            'karma-mocha'
        ],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        client: {
            captureConsole: true,
            mocha: {
                bail: true
            }
        }
    });
};
