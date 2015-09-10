/*
var gulp = require('gulp');
var karma = require('karma').server;
var paths   = require('../paths');

/!**
 * Run test once and exit
 *!/
gulp.task('test', function (done) {
    karma.start({
        configFile:  __dirname + '/../../karma.conf.js',
        singleRun: true
    }, function(e) {
        done();
    });
});

/!**
 * Watch for file changes and re-run tests on each change
 *!/
gulp.task('tdd', function (done) {
    karma.start({
        configFile: __dirname + '/../../karma.conf.js'
    }, function(e) {
        done();
    });
});*/

var gulp = require('gulp');
var wiredep = require('wiredep');
var inject = require('gulp-inject');
var plumber = require('gulp-plumber');
var order = require('gulp-order');
var Server = require('karma').Server;
var path = require('path');
var paths = require('../paths');
var runSequence = require('run-sequence');


var root = path.join(__dirname, '../../');
/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
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
      .pipe(inject(gulp.src(['./src/client/app/**/*.js'], {read: false}),
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
