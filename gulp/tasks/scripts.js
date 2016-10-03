/*global require, module, __dirname */
var config = require('../config').scripts,
	pump = require('pump'),
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

gulp.task('scripts', function(cb) {
	pump([
		gulp.src(config.src),
		$.concat(config.name),
		//$.uglify({
		//	preserveComments: 'license'
		//}),
		gulp.dest('dist')
	],
	cb
	);
});