// gulpfile.js
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();

// clean, dev, build
gulp.task('clean', function () {
    del(['dist/']);
});
gulp.task('dev', function () {
    server();
});
gulp.task('build', function () {

});

// server
function server() {
    browserSync.init({
        startPath: "/",
        files: ["app/**/*.*"],
        server: {
            baseDir: 'app/'
        },
        open: false,
        notify: false
    });
}