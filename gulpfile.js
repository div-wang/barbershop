var gulp = require('gulp'),
    swig = require('gulp-swig'),
    markdown = require('gulp-markdown'),
    jsdoc = require("gulp-jsdoc3"),
    mdTpl = require('./lib/markdownTpl.js'),
    getServe = require('./lib/app.js')

gulp.task('serve', getServe({
    port: '3000',
    root: '/dist'
}))

gulp.task('css', function() {
    gulp.src('./src/static/css/*.css')
        .pipe(gulp.dest('./dist/static/css'))
})

gulp.task('js', function() {
    gulp.src('./src/static/js/*.js')
        .pipe(gulp.dest('./dist/static/js'))
})

gulp.task('doc', function (cb) {
    var config = require('./conf.json');
    gulp.src(['README.md', './src/static/js/*.js'], {read: false})
        .pipe(jsdoc(config));
})

gulp.task('img', function() {
    gulp.src('./src/static/img/**')
        .pipe(gulp.dest('./dist/static/img'))
})

gulp.task('bower', function() {
    gulp.src('./src/static/bower_components/**')
        .pipe(gulp.dest('./dist/static/bower'))
})

gulp.task('html', function() {
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
})

gulp.task('watch', function() {
    gulp.watch('./src/static/css/*.css', ['css'])
    gulp.watch('./src/static/js/*.js', ['js'])
    gulp.watch('./src/html/**/*.html', ['html'])
})

gulp.task('build', ['css', 'js', 'img', 'bower', 'html'])

gulp.task('default', ['build', 'watch', 'serve'])

