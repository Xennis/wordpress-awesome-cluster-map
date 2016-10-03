/*global require, module, __dirname */
var config = require('../config').scripts,
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

gulp.task('scripts', function() {
	return gulp.src(config.src)
		.pipe($.concat(config.name))
		.pipe(gulp.dest(config.dest))
		//.pipe($.uglify())
	;
});