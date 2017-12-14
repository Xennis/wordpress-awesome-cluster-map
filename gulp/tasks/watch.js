/*global require, module, __dirname */
const config = require('../config').watch;
const gulp = require('gulp');

gulp.task('watch', function () {
	gulp.watch(config.styles, ['styles']);
	gulp.watch(config.scripts, ['scripts']);
});