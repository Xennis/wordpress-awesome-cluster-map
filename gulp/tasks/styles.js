/*global require, module, __dirname */
var config = require('../config').styles,
	path = require('path'),
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src(config.src)
        .pipe($.less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
            }))
        .on('error', handleError)
		.pipe($.rename({
			  suffix: '.min'
		}))
		.pipe($.minifyCss())
        .pipe(gulp.dest(config.dest))
		//.pipe(reload({stream: true}))
		//.pipe($.size())
		;
});

var handleError = function (err) {
    new $.util.log(err);
    $.notify.onError({
        title: err.plugin+' error',
        message: path.basename(err.filename)+" on line "+err.line+":"+err.column,
        sound: false
      })(err);
      this.emit('end');
};