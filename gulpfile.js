'use strict'

var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var minifyCss    = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var stylus       = require('gulp-stylus');
var plumber      = require('gulp-plumber');

var vendors = {
    css: [
        'bower_components/bootstrap/dist/css/bootstrap.min.css'
    ],
    js: [
        "bower_components/jquery/dist/jquery.min.js",
        "bower_components/bootstrap/dist/js/bootstrap.min.js"
    ],
    fonts: [
        "bower_components/bootstrap/dist/fonts/*"
    ]
};

// копируем библиотеки
gulp.task('libs', function() {
    gulp.src(vendors.css)
        .pipe(concat('vendors.css'))
        .pipe(gulp.dest('./dist/css/'));
    gulp.src(vendors.js)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('./dist/js/'));
    gulp.src(vendors.fonts)
        .pipe(gulp.dest('./dist/fonts/'));
});

// php
gulp.task('php', function() {
    gulp.src('./app/php/*')
    .pipe(gulp.dest('./dist/php/'));
});

// stylus
gulp.task('stylus', function () {
    gulp.src('./app/style/**/*.styl')
    .pipe(plumber())
    .pipe(stylus({compress: true}))
    .pipe(autoprefixer('> 1%', 'last 15 versions', 'ie 8', 'Firefox ESR', 'Opera 12.1'))
    .pipe(concat('style.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css/'))
});

// js
gulp.task('js', function () {
    gulp.src('./app/js/**/*.js')
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
});

// watch
gulp.task('watch', function () {
    gulp.watch('./app/style/**/*.styl', ['stylus']); 
    gulp.watch('./app/js/**/*.js', ['js']);
    gulp.watch('./app/php/**/*.php', ['php']);
});

// default
gulp.task('default', ['libs', 'php', 'stylus', 'js', 'watch']);