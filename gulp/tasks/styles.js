/*global require, module, __dirname */
const config = require('../config').styles;
const path = require('path');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('styles', ['images'], function () {
	return gulp.src(config.src)
		.pipe(plugins.less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.on('error', handleError)
		.pipe(plugins.rename({
			suffix: '.min'
		}))
		.pipe(plugins.cleanCss({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest(config.dest))
		;
});

var handleError = function (err) {
	new plugins.util.log(err);
	plugins.notify.onError({
		title: err.plugin+' error',
		message: path.basename(err.filename)+" on line "+err.line+":"+err.column,
		sound: false
	})(err);
	this.emit('end');
};