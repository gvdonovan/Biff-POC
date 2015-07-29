var gulp        = require('gulp');
var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');
       
/**
 * Serve
 */      
gulp.task('serve', ['index'], function(done) {
  browserSync({
    open: true,
    port: 9000,
    server: {
      baseDir: 'src/client/',
      index: "index.html",

      /*
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
      */

      middleware: [
        modRewrite([
          '^([^.]+)$ /index.html [L]'
        ])
      ]
    }
  }, done);
});


/////////////// old scripts below //////////////////
/**
 * Wire dependencies
 */
// gulp.task('wiredep', function() {
//   return gulp
//        .src(index)
//        .pipe(wiredep.stream({
//          directory: './bower_components/',
//          bowerJson: require('../../bower.json')
//        }))        
//        .pipe(gulp.dest(client));
// });

// /**
//  * Inject Application Scripts
//  */
// gulp.task('scripts', function(){
//   return gulp
//     .src(index)
//     .pipe(inject(gulp.src(js)
//     .pipe(order(jsOrder), {read: false, name: 'inject'}), {relative: true}))
//     .pipe(gulp.dest(client))
// });

// /**
//  * Copy Bower Components (deep)
//  */
// gulp.task('vendor', function() {
//     return gulp.src('./bower.json')
//         .pipe(mainBowerFiles())
//         .pipe(gulp.dest('./src/client/vendor/js/'));
// });