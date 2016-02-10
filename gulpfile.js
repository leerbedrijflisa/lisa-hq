var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'www'
    }
  });

  gulp.watch(['*.html', '*.css', '*.js'], {cwd: 'www'}, browserSync.reload);
});