var gulp = require('gulp');
var wiredep = require('wiredep');
var inject = require('gulp-inject');
var plumber = require('gulp-plumber');
var order = require('gulp-order');
var Server = require('karma').Server;
var path = require('path');
var paths = require('../paths');
var runSequence = require('run-sequence');
var config = require('./../../gulp.config')();
var args = require('args');
var port = process.env.PORT || config.defaultPort;
var $ = require('gulp-load-plugins')({lazy: true});
var browserSync = require('browser-sync');

var root = path.join(__dirname, '../../');
/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    log('Starting tests');
    runSequence('karmaInject', 'karmaRun');
});

gulp.task('karmaInject', function(){
    var stream = gulp
        .src(paths.karma + 'karma.conf.js')
        .pipe(plumber())
        .pipe(wiredep.stream({
            directory: 'bower_components',
            exclude: '',
            dependencies: true,
            devDependencies: true,
            fileTypes: {
                js: {
                    block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                    detect: {
                        js: /['\']([^'\']+\.js)['\'],?/gi,
                    },
                    replace: {
                        js: '"{{filePath}}",'
                    }
                }
            }
        }))
        .pipe(inject(gulp.src(['./src/client/app/**/*.module.js', './src/client/app/**/*.js'], {read: false}),
            {
                starttag: '// inject:js',
                endtag: '// endinject',
                transform: function (filepath, file, i, length) {
                    filepath = filepath.substring(1);
                    return '"' + filepath + '"' + (i + 1 < length ? ',' : ',');
                }
            }))
        .pipe(gulp.dest('./'));

    return stream;

});

gulp.task('karmaRun', function(done){
    new Server({
        configFile: root + '/karma.conf.js',
        singleRun: true
    }, done).start();

});

/**
 * Serve up the spec runner in browser
 */
gulp.task('serve-specs', ['build-specs'], function(done) {
    log('run the spec runner');
    serve(true /* isDev */, true /* specRunner */);
    done();
});

/**
 * Inject all files required to run specs in HTML Spec runner
 */
gulp.task('build-specs', function(){
    log('building the spec runner');

    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();
    var specs = config.specs;

    options.devDependencies = true;

    if (args.startServers) {
        specs = [].concat(specs, config.serverIntegrationSpecs);
    }

    return gulp
        .src(config.specRunner)
        .pipe(wiredep(options))
        .pipe(inject(gulp.src(config.testlibraries),
            {name: 'inject:testlibraries', read: false}))
        .pipe(inject(gulp.src(config.js)
            .pipe(order(['**/app.module.js', '**/*.module.js', '**/*.js']), {read: false, name: 'inject'}), {relative: true}))
        .pipe(inject(gulp.src(config.specHelpers),
            {name: 'inject:spechelpers', read: false}))
        .pipe(inject(gulp.src(config.specs),
            {name: 'inject:specs', read: false}))
        .pipe(inject(gulp.src(config.temp + config.templateCache.file),
            {name: 'inject:templates', read: false}))
        .pipe(gulp.dest(config.client));
});


/**
 * Watch for file changes and re-run tests on each change
 */
// NOT CURRENTLY USING THIS
/*
 gulp.task('tdd', function (done) {
 karma.start({
 configFile: root + '/karma.conf.js'
 }, function (e) {
 done();
 });
 });*/


////////////

function serve(isDev, specRunner) {
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started');
            startBrowserSync(isDev, specRunner);
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
}

function startBrowserSync(isDev, specRunner) {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    if (isDev) {
        gulp.watch([config.less], ['styles'])
            .on('change', changeEvent);
    } else {
        gulp.watch([config.less, config.js, config.html], ['optimize', browserSync.reload])
            .on('change', changeEvent);
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*',
            '!' + config.less,
            config.temp + '**/*.css'
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    if (specRunner) {
        options.startPath = config.specRunnerFile;
    }

    browserSync(options);
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}
