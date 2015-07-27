var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');

function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function() {
  gulp.watch(paths.source).on('change', browserSync.reload);
  gulp.watch(paths.html).on('change',  browserSync.reload);
  gulp.watch(paths.style).on('change',  browserSync.reload);
});
