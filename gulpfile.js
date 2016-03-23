var del = require("del"),
    gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require("gulp-minify-css"), //压缩CSS文件
    rename = require("gulp-rename"),  //重命名
    concat = require('gulp-concat'),  //将多个文件合并到一个文件
    uglify = require('gulp-uglify'), //压缩JS文件
    order  = require('gulp-order'),
    filter = require('gulp-filter'),
    imagemin = require('gulp-imagemin'), //图片压缩
    pngquant = require('imagemin-pngquant');//png图片压缩

/*压缩前先清除内容*/
gulp.task('clean', function(cb) {
    del(['dest/sass', 'dest/js'], cb)
});
/*压缩JS文件*/
gulp.task('js', function () {
    gulp.src('demo/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dest/js'))           //输出js到文件夹
        .pipe(rename({suffix: '.min'}))           //rename压缩后的文件名
        .pipe(uglify())                           //压缩
        .pipe(gulp.dest('dest/js'));//输入的路径
});
/*压缩插件js文件*/
gulp.task('unit', function () {
    gulp.src('demo/unit/*.js')
        .pipe(concat('unit.js'))
        .pipe(gulp.dest('dest/unit'))           //输出js到文件夹
        .pipe(rename({suffix: '.min'}))           //rename压缩后的文件名
        .pipe(uglify())                           //压缩
        .pipe(gulp.dest('dest/unit'));//输入的路径
});
/*压缩CSS文件*/
gulp.task('css', function () {
    gulp.src('demo/sass/all.scss') // 要压缩的样式文件
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                'Android 2.3',
                'Android >= 4',
                'Chrome >= 35',
                'Firefox >= 31',
                'Explorer >= 7',
                'iOS >= 7',
                'Opera >= 12',
                'Safari >= 7.1'
            ],
            cascade: false
        }))
        .pipe(concat('all.css'))
        .pipe(minifyCss())    //压缩css
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dest/css'));
});

/*压缩图片文件*/
gulp.task('img', function () {
    return gulp.src('demo/img/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dest/img'));
});

/*整体压缩和监听*/
gulp.task('build',["clean","js","css","img","unit"],function(){
    console.log("合并压缩结束")
});
gulp.task('build:watch',function(){
    gulp.watch(['watch'])
});

/*帮助*/
gulp.task('help',function(){
    console.log("build  #编译压缩css js 及图片");
    console.log("clean  #清除编译好的数据");
    console.log("img  #单独压缩图片");
    console.log("js  #单独压缩js");
    console.log("unit  #单独压缩插件js文件");
    console.log("build:watch  #实时监听并且编译压缩scss js 及图片");
});