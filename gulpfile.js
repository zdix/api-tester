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

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var ignore = require('gulp-ignore');
var debug = require('gulp-debug');
const filter = require('gulp-filter');

var fs = require("fs");

var isProd = false;

// 所有要生成的包含js/css/img的子目录,生成在在build目录下,保持目录结构
var apps = ['api'];
// var apps = ['admin'];

// 所有要生成的网页,都放在build根目录下
var pages = [
    { layout: 'inspinia', name: 'api', file: 'index.html', title: 'Api Debug' }
];

// 删除build,忽略build下的asset文件夹
gulp.task('clean-build', function(){
    var tasks = [];

    // const f = filter(['!build/asset{,/*,/**,/**/*}']);
    const f = filter(['!build/asset']);

    tasks.push(
        gulp.src(['build/**/*', 'build/*', 'build/**'], {read: false})
            // gulp.src(['build'], {read: false})
            .pipe(f)
            // .pipe(ignore.exclude('build/asset{,/*,/**,/**/*}'))
            .pipe(clean({force: true}))
    );

    return merge.apply(null, tasks);
});

// 删除dist
gulp.task('clean-dist', function(){
    var tasks = [];

    tasks.push(
        gulp.src(['dist'], {read: false})
            .pipe(clean({force: true}))
    );

    return merge.apply(null, tasks);
});

// 设置生产环境标志
gulp.task('set-prod-true', function(){
    isProd = true;
});

// 生成inspina库
gulp.task('concat-inspinia', ['clean-build'], function(){

    if (fs.existsSync('build/asset/inspinia/css') && fs.existsSync('build/asset/inspinia/js')){
        return;
    }

    var copyTask = gulp.src('./lib/inspinia/**/*')
        .pipe(gulp.dest('build/asset/inspinia/'));

    var cssBundleTask = gulp.src([
            //'./lib/inspinia/css/bootstrap.min.css',
            //'./lib/inspinia/font-awesome/css/font-awesome.css',
            //'./lib/inspinia/css/animate.css',
            //'./lib/inspinia/css/style.css',
            // './lib/inspinia/',
        ])
        .pipe(concat('bundle.min.css', {newLine: '\r\n'}))
        .pipe(gulp.dest('build/asset/inspinia/css/'));

    var jsBundleTask = gulp.src([
            //'./lib/inspinia/js/jquery/jquery-2.1.1.min.js',
            //'./lib/inspinia/js/plugins/jquery-ui/jquery-ui.min.js',
            //'./lib/inspinia/js/bootstrap/bootstrap.min.js',
            //'./lib/inspinia/js/plugins/metisMenu/jquery.metisMenu.js',
            //'./lib/inspinia/js/plugins/slimscroll/jquery.slimscroll.min.js',
            //'./lib/inspinia/js/plugins/pace/pace.min.js',
            //'./lib/inspinia/js/inspinia.js',
            './lib/inspinia/js/angular/angular.min.js',
            //'./node_modules/angular-route/angular-route.min.js',
            './node_modules/angular-local-storage/dist/angular-local-storage.min.js',
            //'./lib/inspinia/js/angular/angular-sanitize.min.js',
            //'./lib/ocLazyLoad/dist/ocLazyLoad.min.js',
            //'./lib/inspinia/js/angular-translate/angular-translate.min.js',
            './lib/inspinia/js/ui-router/angular-ui-router.min.js',
            //'./lib/inspinia/js/bootstrap/ui-bootstrap-tpls-1.1.2.min.js',
            //'./lib/inspinia/js/plugins/angular-idle/angular-idle.js',
            './node_modules/angular-ui-notification/dist/angular-ui-notification.min.js',
            //'./lib/inspinia/',
        ])
        .pipe(concat('bundle.min.js', {newLine: ';\r\n'}))
        .pipe(gulp.dest('build/asset/inspinia/js/'));

    return merge(copyTask, cssBundleTask, jsBundleTask);
});

// 生成core下的template模板
gulp.task('build-angular-template-core', ['clean-build'], function(){

    var src = ['core/template/*.html', 'core/template/**/*.html'];

    var tasks = [];
    var taskCore = gulp.src(src)
        .pipe(templateCache({ root: 'core/template', standalone: true}))
        .pipe(rename('core.template.js'))
        .pipe(gulp.dest('build/core-template'));
    tasks.push(taskCore);

    return merge.apply(null, tasks);
});

// 生成各个app下的template模板
gulp.task('build-angular-template', ['build-angular-template-core'], function(){
    var tasks = [];

    for (var i in apps)
    {
        var dir = apps[i];
        var task = gulp.src(['app/' + dir + '/template/*.html', 'app/' + dir + '/template/**/*.html', 'app/' + dir + '/module/**/*.html'])
            .pipe(templateCache({ root: dir}))
            .pipe(rename('template.js'))
            .pipe(gulp.dest('build/' + dir + '/js'));
        tasks.push(task);
    }

    return merge.apply(null, tasks);
});

// 将core生成的template加到各个app生成的template
gulp.task('concat-angular-template', ['build-angular-template-core', 'build-angular-template'], function(){
    var tasks = [];

    for (var i in apps)
    {
        var dir = apps[i];
        var task = gulp.src(['build/core-template/*.js', 'build/' + dir + '/js/template.js'])
            .pipe(concat('template.js'))
            .pipe(gulp.dest('build/' + dir + '/js'));
        tasks.push(task);
    }

    return merge.apply(null, tasks);
});

// 将core生成的js加到各个app生成的js
gulp.task('build-js', ['clean-build', 'concat-angular-template'], function(){
    var tasks = [];

    for (var i in apps)
    {
        var dir = apps[i];
        var task = gulp.src(['core/js/*.js', 'core/js/'+ dir +'/*.js', 'app/' + dir + '/**/*.js'])
            .pipe(concat('app'))
            .pipe(rename({ extname: '.js' }))
            .pipe(gulp.dest('build/' + dir + '/js'));
        tasks.push(task);

        var taskProd = gulp.src(['core/js/*.js', 'core/js/'+ dir +'/*.js', 'app/' + dir + '/**/*.js'])
            .pipe(uglify())
            .pipe(concat('app'))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(gulp.dest('build/' + dir + '/js'));
        tasks.push(taskProd);
    }
    return merge.apply(null, tasks);
});

// 将各个app的template模板js与应用js合并,生成最终的bundle
gulp.task('build-js-bundle', ['build-js', 'concat-angular-template'], function(){
    var tasks = [];

    for (var i in apps)
    {
        var dir = apps[i];
        var task = gulp.src(['build/' + dir + '/js/template.js', 'build/' + dir + '/js/app.js'])
            .pipe(concat('bundle'))
            .pipe(rename({ extname: '.js' }))
            .pipe(gulp.dest('build/' + dir + '/js'));
        tasks.push(task);

        var taskProd = gulp.src(['build/' + dir + '/js/template.js', 'build/' + dir + '/js/app.min.js'])
            .pipe(concat('bundle'))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(gulp.dest('build/' + dir + '/js'));
        tasks.push(taskProd);
    }

    tasks.push(
        gulp.src(['build/core-template'], {read: false})
            .pipe(clean({force: true}))
    );

    return merge.apply(null, tasks);
});


// 编译stylus
gulp.task('build-stylus', ['clean-build'], function () {
    var tasks = [];

    for (var i in apps)
    {
        var dir = apps[i];
        var task = gulp.src(['core/stylus/*.styl', 'app/' + dir + '/**/**/*.styl'])
            //.pipe(stylus().on('error', stylus.logError))
            .pipe(stylus())
            .pipe(concat('style'))
            .pipe(rename({ extname: '.css' }))
            .pipe(gulp.dest('build/' + dir + '/css'));
        tasks.push(task);

        var taskProd = gulp.src(['core/stylus/*.styl', 'app/' + dir + '/**/*.styl'])
            //.pipe(stylus({outputStyle: 'compressed'}).on('error', stylus.logError))
            .pipe(stylus())
            .pipe(concat('style'))
            .pipe(rename({ extname: '.min.css' }))
            .pipe(gulp.dest('build/' + dir + '/css'));
        tasks.push(taskProd);
    }

    return merge.apply(null, tasks);
});

// 复制app下的img到build目录
gulp.task('copy-image', ['clean-build'], function(){
    var tasks = [];

    for (var i in apps){
        var dir = apps[i];
        var task = gulp.src('app/' + dir + '/img/**')
            .pipe(gulp.dest('build/' + dir + '/img/'));
        tasks.push(task);
    }

    return merge.apply(null, tasks);
});

// 编译html
gulp.task('build-html', ['clean-build', 'build-stylus', 'build-js-bundle', 'copy-image'], function() {
    var tasks = [];

    for (var i in pages)
    {
        var page = pages[i];
        var layout = page.layout ? page.layout : 'inspinia';
        var app = page.app ? page.app : 'app';
        var name = page.name;
        var title = page.title;
        var file = page.file;
        var base = page.base ? page.base : file;
        var path = page.path ? page.path : '';

        var layoutMapping = {
            'inspinia': {
                libCss: ['asset/inspinia/css/bundle.min.css', 'asset/inspinia/css/bundle.min.css'],
                libJs: ['asset/inspinia/js/bundle.min.js', 'asset/inspinia/js/bundle.min.js'],
                appCss: [name + '/css/style.css', name + '/css/style.min.css'],
                appJs: [name + '/js/bundle.js', name + '/js/bundle.min.js']
            },
            'inspinia-demo': {
                libCss: ['css/bundle.min.css', 'css/bundle.min.css'],
                libJs: ['js/bundle.min.js', 'js/bundle.min.js'],
                appCss: [name + '/css/style.css', name + '/css/style.min.css'],
                appJs: [name + '/js/bundle.js', name + '/js/bundle.min.js']
            }
        };

        var libCss = isProd ? layoutMapping[layout].libCss[1] : layoutMapping[layout].libCss[0];
        var libJs = isProd ? layoutMapping[layout].libJs[1] : layoutMapping[layout].libJs[0];
        var appCss = isProd ? layoutMapping[layout].appCss[1] : layoutMapping[layout].appCss[0];
        var appJs = isProd ? layoutMapping[layout].appJs[1] : layoutMapping[layout].appJs[0];

        var taskProd = gulp.src(['core/layout/'+ layout +'.html'])
            .pipe(replace('@ng-app-name', app))
            .pipe(replace('@title', title))
            .pipe(replace('@base-url', base))
            .pipe(replace('@lib-css', libCss))
            .pipe(replace('@app-css', appCss))
            .pipe(replace('@lib-js', libJs))
            .pipe(replace('@app-js', appJs))
            .pipe(isProd ? minifyHTML() : empty())
            .pipe(rename(file))
            .pipe(gulp.dest('build/' + path));
        tasks.push(taskProd);
    }

    return merge.apply(null, tasks);
});

// 给build目录下各app目录的css以及js文件打版本,准备生成发布版
gulp.task('rev', ['default', 'clean-dist'], function(){
    return gulp.src(['build/**/*'])
        //.pipe(rev())
        .pipe(gulp.dest('dist/'))
        //.pipe(rev.manifest())
        //.pipe(gulp.dest('build/'))
});

// 生成发布版的html,各静态资源带版本号
gulp.task('rev-replace', ["rev", 'clean-dist'], function(){
    var manifest = gulp.src('build/rev-manifest.json');

    return gulp.src(['build/*.html'])
        //.pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest('dist/'))
});

// 压缩图片
gulp.task('imagemin', ['rev-replace', 'rev-replace'], function(){
    var tasks = [];

    for (var i in apps){
        var dir = apps[i];
        var task = gulp.src('app/' + dir + '/img/**')
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest('dist/' + dir + '/img/'));
        tasks.push(task);

        if (isProd)
        {
            var compressTask = gulp.src('dist/' + dir + '/img/**')
                .pipe(imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [pngquant()]
                }))
                .pipe(gulp.dest('dist/' + dir + '/img/'));
            tasks.push(compressTask);
        }
    }

    return merge.apply(null, tasks);
});

gulp.task('default', [
    'clean-build',
    'concat-inspinia',
    'build-angular-template-core',
    'build-angular-template',
    'concat-angular-template',
    'build-js',
    'build-js-bundle',
    'build-stylus',
    'copy-image',
    'build-html'
]);

gulp.task('build', ['default']);

gulp.task('release', [
    //'set-prod-true',
    'clean-dist',
    'concat-inspinia',
    'build-angular-template-core',
    'build-angular-template',
    'concat-angular-template',
    'build-js',
    'build-js-bundle',
    'build-stylus',
    'copy-image',
    'build-html',
    'rev',
    'rev-replace',
    'imagemin'
]);

gulp.task('watch', function(){
    var jsWatcher = gulp.watch(['app/**/js/*.js', 'app/**/module/**/*.js', 'core/js/*.js'], ['default']);
    jsWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var htmlWatcher = gulp.watch(['app/**/module/**/*.html', 'app/**/*.html', 'core/**/*.html'], ['default']);
    htmlWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var cssWatcher = gulp.watch(['app/**/*.styl', 'app/**/template/**/*.styl', 'core/stylus/*.styl'], ['default']);
    cssWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('sync', function() {
    browserSync.init({
        server: "./build",
        open: false
    });
});

gulp.task('sync-dist', function() {
    browserSync.init({
        server: "./dist",
        open: false
    });
});