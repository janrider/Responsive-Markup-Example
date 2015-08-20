var gulp = require('gulp'),
    watch = require('gulp-watch'),
    myth = require('gulp-myth'), // Plugin Myth - http://www.myth.io/
    csso = require('gulp-csso'), // Minification CSS
    uglify = require('gulp-uglify'), // Minification JS
    concat = require('gulp-concat');

gulp.task('css', function() {
    gulp.src(['./static/css/assets/*.css', '!./static/css/assets/blocks/*.css'])
        .pipe(concat('main.min.css'))
        .pipe(myth())
        .pipe(csso())
        .pipe(gulp.dest('./static/css'))
});

gulp.task('js', function() {
    gulp.src(['./static/js/assets/*.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});

// Server
gulp.task('dev', function() {
    var express = require('express');
    var app = express();
    app.set('views', __dirname + '/static')
    app.use(express.logger('dev'))
    app.use(express.static(__dirname + '/static'))

    app.listen(3002);
});
// Watch
gulp.task('watch', function() {
    gulp.watch(['./static/css/assets/*.css', '!./static/css/assets/blocks/*.css'], ['css']);
    gulp.watch('./static/js/assets/*.js', ['js']);
});

// Build
gulp.task('build', ['css', 'js'], function() {
});

