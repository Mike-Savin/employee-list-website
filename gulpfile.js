// Gulpfile.js
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  nodemon = require('gulp-nodemon'),
  rename = require('gulp-rename'),
  loopbackAngular = require('gulp-loopback-sdk-angular'),
  install = require("gulp-install"),
  wiredep = require('wiredep').stream,
  browserSync = require('browser-sync'),
  runSequence = require('run-sequence');

gulp.task('lb-ng', function() {
  return gulp.src('./server/server.js')
    .pipe(loopbackAngular())
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest('./client/js'));
});

gulp.task('install', function() {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(install());
});

gulp.task('index', function() {
  gulp.src('./client/views/index.html')
    .pipe(wiredep({
      // optional: 'configuration',
      // goes: 'here'
    }))
    .pipe(gulp.dest('./client'));
});

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_LOAD_DELAY = 1500,
  BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon({

      // nodemon our expressjs server
      script: 'server/server.js',

      // watch core server file(s) that require server restart on change
      watch: ['server/*', 'common/*']
    })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) {
        cb();
      }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function() {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  setTimeout(function() {
    browserSync({

      // informs browser-sync to proxy our expressjs app which would run at the following location
      proxy: 'http://localhost:3000',

      // informs browser-sync to use the following port for the proxied app
      // notice that the default port is 3000, which would clash with our expressjs
      port: 4000,

      // open the proxied app in chrome
      // browser: ['google-chrome']
    });
  }, BROWSER_SYNC_LOAD_DELAY);
});

gulp.task('js', function() {
  return gulp.src(['client/js/**/*.js', '!client/js/lb-services.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./client'));
});

gulp.task('css', function() {
  return gulp.src('client/**/*.css')
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('default', ['install', 'index', 'lb-ng', 'js'], function() {
  runSequence('browser-sync', function () {
    gulp.watch('common/*', ['lb-ng', 'bs-reload']);
    gulp.watch('client/**/*.js', ['js', 'bs-reload']);
    gulp.watch('client/**/*.css', ['css']);
    gulp.watch('client/**/*.html', ['bs-reload']);
    gulp.watch('bower.json', ['install', 'index', 'bs-reload']);
  })
});
