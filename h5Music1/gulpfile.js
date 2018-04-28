

var gulp = require('gulp'),
    htmlClean = require('gulp-htmlclean'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    imgMin = require('gulp-imagemin'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    postcss = require('gulp-postcss'),
    stripeDebug = require('gulp-strip-debug'),
    less = require('gulp-less'),
    concatJS = require('gulp-concat');


var devMode = process.env.NODE_ENV == 'development';
console.log(devMode);

var folder = {
    src: './src/',
    build: './build/'
}
gulp.task('html', function () {
    var page = gulp.src(folder.src + 'html/*')
        

    if (!devMode) {
        page.pipe(htmlClean())
    }
    page.pipe(connect.reload())
    page.pipe(gulp.dest(folder.build + 'html/'))
})

gulp.task('img', function () {
    var page = gulp.src(folder.src + 'img/*')
        
        .pipe(imgMin())
        .pipe(connect.reload())
        .pipe(gulp.dest(folder.build + 'img/'))
})

gulp.task('css', function () {
    var option = [cssnano(), autoprefixer()];
    var page = gulp.src(folder.src + 'css/*')
        .pipe(less())

    if (!devMode) {
        page.pipe(postcss(option))
    } 
    page.pipe(connect.reload())
    page.pipe(gulp.dest(folder.build + 'css/'));
})

gulp.task('js', function () {
    var page = gulp.src(folder.src + 'js/*')
        
    if (!devMode) {
        // page.pipe(uglify())
            // .pipe(stripeDebug())
            page.pipe(concatJS('main.js'))
    }
    page.pipe(connect.reload())
    page.pipe(gulp.dest(folder.build + 'js/'))
})

gulp.task('watch', function () {
    gulp.watch(folder.src + 'img/*', ['img']);
    gulp.watch(folder.src + 'js/*', ['js']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'html/*', ['html']);
})

gulp.task('server', function () {
    connect.server({
        port: 8090,
        livereload: false
    })
})


gulp.task('default', ['html', 'watch', 'js', 'css', 'server', 'img'])