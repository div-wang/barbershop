var gulp = require('gulp'),
    swig = require('gulp-swig'),
    markdown = require('gulp-markdown'),
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
    gulp.src('./src/static/js/**')
        .pipe(gulp.dest('./dist/static/js'))
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
    gulp.watch('./src/html/*.html', ['html'])
})

gulp.task('build', ['css', 'js', 'img', 'bower', 'html'])

gulp.task('default', ['build', 'watch', 'serve'])

