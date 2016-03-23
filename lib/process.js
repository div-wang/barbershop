var gulp = require('gulp'),
    swig = require('gulp-swig'),
    markdown = require('gulp-markdown'),
    mdTpl = require('./markdownTpl.js')


function css(){
    gulp.src('./src/static/css/*.css')
        .pipe(gulp.dest('./dist/static/css'))
}

function js(){
    gulp.src('./src/static/js/*.js')
        .pipe(gulp.dest('./dist/static/js'))
}

function img(){
    gulp.src('./src/static/img/**')
        .pipe(gulp.dest('./dist/static/img'))
}

function bower(){
    gulp.src('./src/static/bower_components/**')
        .pipe(gulp.dest('./dist/static/bower'))
}

function html(){
    var data = {
        time: new Date().getTime(),
    }
    gulp.src('./src/html/*.html')
        .pipe(swig({
            defaults: {
                cache: false,
                locals: data
            }
        }))
        .pipe(gulp.dest('./dist'))
}

function watch() {
    gulp.watch('./src/static/css/*.css', css)
    gulp.watch('./src/static/js/*.js', js)
    gulp.watch('./src/html/**/*.html', html)
}

module.exports = function() {
    css()
    js()
    img()
    bower()
    watch()
};
