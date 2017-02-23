const gulp = require('gulp'),
    path = require('path'),
    ava = require('gulp-ava'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat-util'),
    sourcemaps = require('gulp-sourcemaps'),
    chmod = require('gulp-chmod');

gulp.task('compile-src', () => {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat.header('var regeneratorRuntime = require(\'babel-regenerator-runtime\');'))
        .pipe(concat.header('var Reflect = require(\'reflect-r\');'))
        .pipe(sourcemaps.write('.', { sourceRoot: path.join(__dirname, 'src') }))
        .pipe(gulp.dest('build'));
});

gulp.task('compile', [ 'compile-src' ]);

gulp.task('default', [ 'compile' ]);
