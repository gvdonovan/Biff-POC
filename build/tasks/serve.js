var gulp = require('gulp');
var browserSync = require('browser-sync');
var gulpFilter = require('gulp-filter')
var mainBowerFiles = require('gulp-main-bower-files');
var wiredep = require('wiredep');

var client = './src/client/';    
var clientApp = client + 'app/';
var index = client + 'index.html';
var js = [ clientApp + '**/*.js']; 

var bower = {
  json: require('../../bower.json'),
  directory: './bower_components/',
  ignorePath: '../..'
};

var wiredepOptions = function() {
  var options = {
    bowerJson: bower.json,
    directory: bower.directory,
    ignorePath: bower.ignorePath
  };
  return options;
};
 
gulp.task('wiredep', function() {
  
  var options = {bowerJson: bower.json, directory: bower.directory, ignorePath: bower.ignorePath};
  
  console.log(options.directory);
  console.log(wiredep);
  
    return gulp
       .src(index)
       .pipe(wiredep(options))        
       .pipe(gulp.dest(client));
});
  
gulp.task('vendor', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(gulp.dest('./src/client/scripts/vendor/'));
});

gulp.task('serve', ['bower'], function(done) {
  browserSync({
    open: false,
    port: 9000,   
    server: {
      baseDir: 'src/client/',
      index: "index.html"
    }
  }, done);
});