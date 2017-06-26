'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    sourcemaps = require("gulp-sourcemaps"),
    cleanCss = require('gulp-clean-css'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('js', function() {
    gulp.src(['assets/js-html/vendor/*.js','assets/js-html/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        proxy: "http://site.loc/",
        notify: false
    })
});

gulp.task('img', function(cb) {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/images/'))
        .on('end', cb).on('error', cb);
});

gulp.task('sass', function(){
    gulp.src('assets/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 0%']
        }))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/css'))
        .pipe(rename('style.min.css',{ suffix: '.min' }))
        .pipe(cleanCss())
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('clean', function() {
    del(['assets/css', 'assets/scripts']);
});

gulp.task('watch',['browserSync','sass','js'], function(){

    gulp.watch('assets/sass/**/*.scss',['sass']);

    gulp.watch('*.html', browserSync.reload);

    gulp.watch('assets/js-html/*.js',['js']);

    gulp.watch('assets/js/*.js', browserSync.reload);

});
