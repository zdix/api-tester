var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var minifyHTML = require('gulp-minify-html');
var rename = require("gulp-rename");
var merge = require('merge-stream');
var phpjs = require('phpjs');
var clean = require('gulp-clean');
var templateCache = require('gulp-angular-templatecache');
var mkdirp = require('mkdirp');
var empty = require("gulp-empty");
var shell = require('gulp-shell');
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");
var browserSync = require('browser-sync').create();
var stylus = require('gulp-stylus');
var sass = require('gulp-sass');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var ignore = require('gulp-ignore');
var debug = require('gulp-debug');
const filter = require('gulp-filter');

var fs = require("fs");


gulp.task('clean-build', function () {

    // var task = gulp.src(['build'], {read: false})
    //     .pipe(clean({force: true}));
    //
    // return merge(task);
});

//合并LIB下的js
gulp.task('build-lib-js', ['clean-build'], function () {
    var jsBundleTask = gulp.src([
            './lib/angular.min.js',
            './lib/angular-local-storage.min.js',
            './lib/core.js',
        ])
        .pipe(concat('bundle.min.js', {newLine: ';\r\n'}))
        .pipe(gulp.dest('build/'));

    return merge(jsBundleTask);
});

//合并app下的js
gulp.task('build-js', ['clean-build'], function () {
    var task = gulp.src(['app/*.js'])
        .pipe(concat('app'))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('build/'));

    return merge(task);
});

// 编译stylus
gulp.task('build-stylus', ['clean-build'], function () {
    var task = gulp.src(['app/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('app.css'))
        .pipe(gulp.dest('build/'));


    return merge(task);
});

// 编译html
gulp.task('build-html', ['clean-build', 'build-stylus', 'build-lib-js', 'build-js'], function () {

    var app_html = fs.readFileSync('app/app.html', "utf-8");
    var app_js = fs.readFileSync('build/app.js', "utf-8");
    var bundle_js = fs.readFileSync('build/bundle.min.js', "utf-8");
    var app_css = fs.readFileSync('build/app.css', "utf-8");

    var task = gulp.src(['app/index.html'])
        .pipe(replace('@ng-app-name', 'app'))
        .pipe(replace('@title', "Api Test"))
        .pipe(replace('@base-url', 'index.html'))
        .pipe(replace('@app-css','<style>'+ app_css+'</style>'))
        .pipe(replace('@lib-js', '<script>'+bundle_js+'</script>'))
        .pipe(replace('@app-js', '<script>'+app_js+'</script>'))
        .pipe(replace('@page-content', app_html))
        //.pipe(minifyHTML())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('build/'));

    return merge(task);
});

gulp.task('clean-end', ['build-html'], function () {

    var task = gulp.src(['build/*.css','build/*.js'], {read: false})
        .pipe(clean({force: true}));

    return merge(task);
});

gulp.task('concat-all')


gulp.task('default', [
    'clean-build',
    'build-js',
    'build-lib-js',
    'build-stylus',
    'build-html',
    'clean-end'
]);

gulp.task('watch', function () {
    var jsWatcher = gulp.watch(['app/*.js', 'lib/*.js'], ['default']);
    jsWatcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var htmlWatcher = gulp.watch(['app/*.html'], ['default']);
    htmlWatcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var cssWatcher = gulp.watch(['app/*.scss'], ['default']);
    cssWatcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
