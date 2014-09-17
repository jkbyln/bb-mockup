
/**
 * Tasks Ahoy
 * ==========
 */

var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    filter       = require('gulp-filter'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer');


var paths = {
  sass: ['./site/sass/**/*.scss'],
  html: ['./site/*.html'],
  js: ['./site/js/**/*.js']
};


/**
 * Browser Sync
 * ------------
 * Start sync server
 */

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './site/'
    }
  });
});


/**
 * Reload
 * ------
 * Hard reload for sync server
 */

gulp.task('reload', function () {
  browserSync.reload();
});


/**
 * Sass
 * ----
 * - Compile Sass (Look Mom, no Compass!)
 * - Autoprefix like what
 * - Output
 * - Reload sync server (while filtering out `map` file)
 */

gulp.task('sass', function () {

  return gulp.src( paths.sass )
    .pipe( sass({
      style: 'nested',
      bundleExec: true,
      require: [ 'susy', 'breakpoint' ]
    }))
    .pipe( autoprefixer({
      browsers: [ 'last 2 versions' ],
      cascade: false
    }))
    .pipe( gulp.dest( './site/css' ))
    .pipe( filter( '**/*.css' ))
    .pipe( reload({ stream: true }));
});


/**
 * Defaults
 * --------
 */

gulp.task('default', ['sass', 'browser-sync'], function () {
  gulp.watch( paths.sass, [ 'sass' ]);
  gulp.watch( paths.html, [ 'reload' ]);
  gulp.watch( paths.js, ['reload'] );
});
