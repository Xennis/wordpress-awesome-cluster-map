/*global require, module, __dirname */
const config = require('../config').scripts;
const pump = require('pump');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('scripts', function(cb) {
	pump([
		gulp.src(config.src),
		plugins.concat(config.name),
		//$.uglify({
		//	preserveComments: 'license'
		//}),
		gulp.dest('dist')
	],
	cb
	);
});