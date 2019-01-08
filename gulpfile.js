'use strict';

const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const pump = require('pump');
const rename = require('gulp-rename');

function images() {
	return gulp
		.src([
			'node_modules/leaflet/dist/images/*.*',
			'node_modules/leaflet.awesome-markers/dist/images/*.*',
			'node_modules/leaflet-minimap/dist/images/*.*'
		])
		.pipe(gulp.dest('dist/images'));
}

function scripts(cb) {
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
	], cb);
}

function compileStyles() {
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
		.pipe(gulp.dest('dist/'));
}
const styles = gulp.series(images, compileStyles)

function watch() {
	gulp.watch('src/less/*.less', styles);
	gulp.watch('src/js/*.js', scripts);
}

exports.images = images;
exports.scripts = scripts;
exports.styles = styles;
exports.watch = watch;
exports.default = gulp.series(styles, scripts, watch);
