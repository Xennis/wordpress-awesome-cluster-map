/*global require, module, __dirname */
const gulp = require('gulp');
const pump = require('pump');
const less = require('gulp-less');
const path = require('path');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');

gulp.task('default', ['styles', 'scripts', 'watch']);

gulp.task('images', function() {
	return gulp
		.src([
			'node_modules/leaflet/dist/images/*.*',
			'node_modules/leaflet.awesome-markers/dist/images/*.*',
			'node_modules/leaflet-minimap/dist/images/*.*'
		])
		.pipe(gulp.dest('dist/images'))
	;
});

gulp.task('scripts', function(cb) {
	pump([
		gulp.src([
			'node_modules/leaflet/dist/leaflet.js',
			'node_modules/leaflet.markercluster/dist/leaflet.markercluster.js',
			'node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.min.js',
			'node_modules/leaflet-minimap/dist/Control.MiniMap.min.js',
			'src/js/awesome-cluster-map.js'
		]),
		concat('awesome-cluster-map.min.js'),
		gulp.dest('dist')
	],
	cb
	);
});

gulp.task('styles', ['images'], function () {
	return gulp.src('src/less/awesome-cluster-map.less')
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cleanCss({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest('dist/'))
		;
});

gulp.task('watch', function () {
	gulp.watch('src/less/*.less', ['styles']);
	gulp.watch('src/js/*.js', ['scripts']);
});
