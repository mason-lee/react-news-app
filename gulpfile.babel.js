'use strict';

import babel from 'babel-core/register';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import p from 'gulp-load-plugins';
import babelify from 'babelify';
import watchify from 'watchify';
import webserver from 'gulp-webserver';
import gulp from 'gulp';
import sass from 'gulp-sass';
import del from 'del';

let plugins = p();

gulp.task('js', () => {

	// Bundles the javascript into a single module.
    var b = browserify({
      cache: {},
      debug: true,
      entries: 'src/static/javascript/App.jsx',
      extensions: ['.js', '.jsx'],
      fullPaths: false,
      packageCache: {},
      transform: [ babelify ]
    });

    var bundle = function (files) {

        plugins.util.log("Starting '" + plugins.util.colors.cyan('browserify') + "' " + plugins.util.colors.magenta((files ? ' => ' + files : '')));

        return b.bundle()
            .on('error', function (err) {
                plugins.util.log(plugins.util.colors.red(err.message));
                this.emit('end');
            })
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest('src/static/dist'))
    };

    // Rebunde the javascript on update.
    b = watchify(b)
    .on('update', bundle)
    .on('log', function (msg) {
        plugins.util.log("Finished '" + plugins.util.colors.cyan('browserify') + "' " + msg);
        plugins.util.log("Reload the browser to view changes.");
    });

    return bundle();
});

gulp.task('sass', () => {
    return gulp.src('src/static/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/static/dist/'));
});

gulp.task('sass:watch', () => {
    gulp.watch('src/static/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['js', 'sass', 'sass:watch'], () => {

	gulp.src('src/static/dist')
	    .pipe(webserver({
	      fallback: 'index.html'
	    }));
});
