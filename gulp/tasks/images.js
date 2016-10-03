/*global require, module, __dirname */
var config = require('../config').images,
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

gulp.task('images', function() {
	return gulp.src(config.src)
		.pipe(gulp.dest(config.dest))
	;
});