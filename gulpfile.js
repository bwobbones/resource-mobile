var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jade = require('gulp-jade');
var inject = require('gulp-inject');
var del = require('del');
var typescript = require('gulp-typescript');
var preprocess = require('gulp-preprocess');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('replace');

var paths = {
    sass: ['src/**/*.scss', '!src/ionic.app.scss'],
    sassindex: ['src/ionic.app.scss'],
    jade: ['./src/**/*.jade'],
    jadeindex: ['src/index.jade'],
    src: ['src/**/*.ts', '!src/**/*.mock.ts', '!src/**/*.spec.ts'],
    srcAndTypings: ['src/**/*.ts', 'typings/**/*.ts', '!**/*.mock.ts', '!**/*.spec.ts'],
    serverUrlLocation: ['./www/js/app.js']
};

gulp.task('default', ['sass', 'jade', 'compile']);

gulp.task('clean', function () {
    return del([
        'www/**/*',
        '!www/lib',
        '!www/lib/**/*'
    ]);
});

gulp.task('index-sass', function () {
    return gulp.src(paths.sassindex)
        .pipe(inject(gulp.src(paths.sass), {
            relative: true,
        }))
        .pipe(gulp.dest('./src/'));
});

gulp.task('sass', ['index-sass'], function (done) {
    gulp.src(paths.sassindex)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('index-sass', function () {
    return gulp.src(paths.sassindex)
        .pipe(inject(gulp.src(paths.sass), {
            relative: true,
        }))
        .pipe(gulp.dest('./src/'));
});

gulp.task('jade', ['index'], function (done) {
    gulp.src(paths.jade)
        .pipe(jade())
        .pipe(gulp.dest('./www/'))
        .on('end', done);
});

gulp.task('compile', function (done) {
    gulp.src(paths.srcAndTypings)
        .pipe(preprocess())
        .pipe(typescript({
            noExternalResolve: true
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('www/js/'))
        .on('end', done);
});

gulp.task('index', function () {
    return gulp.src(paths.jadeindex)
        .pipe(inject(
            gulp.src(paths.src), {
                starttag: '//- inject:js',
                relative: false,
                transform: function (filePath, file) {
                    return "script(src='" + filePath.replace(/^\/src/, 'js').replace(/\.ts$/, '.js') + "')"
                }
            }))
        .pipe(gulp.dest('./src/'))
        .pipe(jade())
        .pipe(gulp.dest('./www/'));
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.src, ['compile']);
    gulp.watch(paths.serverUrlLocation, ['use-proxy']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});


gulp.task('use-proxy', function() {
  return replace({
    regex: "http://localhost:9200",
    replacement: "http://localhost:8100/api",
    paths: paths.serverUrlLocation,
    recursive: false,
    silent: false,
  });
});

gulp.task('remove-proxy', function() {
  return replace({
    regex: "http://localhost:8100/api",
    replacement: "http://localhost:9200",
    paths: paths.serverUrlLocation,
    recursive: false,
    silent: false,
  });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
