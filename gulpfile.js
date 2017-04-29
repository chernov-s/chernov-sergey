'use strict';

var
    gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    gutil        = require('gulp-util'),
    browserSync  = require('browser-sync'),
    seq          = require('run-sequence'),
    watch        = require('gulp-watch'),

    rimraf       = require('rimraf'), // For clear

    pug          = require('gulp-pug'),

    //PostCSS
    autoprefixer = require('autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    postcss      = require('gulp-postcss'),
    mqpacker     = require('css-mqpacker'),
    cssnano      = require('cssnano'),
    precss       = require('precss'),
    cssImport    = require('postcss-import');


/* ==========================================================================
 Error handler
 ========================================================================== */

var onError = function (err) {
    var errorLine = (err.line) ? 'Line ' + err.line : '',
        errorTitle = (err.plugin) ? 'Error: [ ' + err.plugin + ' ]' : 'Error';

    gutil.beep();
    gutil.log(gutil.colors.red('\n' + errorTitle + 'line: ' + errorLine + '\n\n', err.message));
    this.emit('end');
};

/* ==========================================================================
 Variables
 ========================================================================== */
var paths = {
    css: './src/css/main.css',
    pug: './src/*.pug',
    pugAll: './src/**/*.pug'
};

var postcssProcessors = [
    cssImport({ glob: true }),
    precss(),
    mqpacker({
        sort: true
    }),
    autoprefixer({ browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],  cascade: true}),
    cssnano()
];

/* ==========================================================================
 Tasks
 ========================================================================== */

gulp.task('default', function (cb) {
    seq('watch', 'server', cb);
});

gulp.task('watch', ['build'], function () {
    watch(paths.pugAll, function () {
        seq('html');
    });
    watch(paths.css, function () {
        seq('css');
    });
});

gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: 'dest'
        },
        notify: false
    });
});

gulp.task('build', function (cb) {
    seq('clean', ['html', 'css'], cb);
});

gulp.task('clean', function (cb) {
    rimraf('dest', cb);
});

/* ==========================================================================
 Tasks (Compile)
 ========================================================================== */

gulp.task('css', function () {
    return gulp.src(paths.css)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(postcss(postcssProcessors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dest/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function () {
    return gulp.src(paths.pug)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dest'))
        .pipe(browserSync.reload({
            stream: true
        }));
});