/*global require, module, __dirname */
const config = require('../config').images;
const gulp = require('gulp');

gulp.task('images', function() {
	return gulp.src(config.src)
		.pipe(gulp.dest(config.dest))
	;
});