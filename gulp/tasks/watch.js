/*global require, module, __dirname */
var config = require('../config').watch,
	gulp = require('gulp');

gulp.task('watch', function () {
	gulp.watch(config.styles, ['styles']);
});