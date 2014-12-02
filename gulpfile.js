// Init
	var gulp    = require('gulp');
	var jshint  = require('gulp-jshint');
	var stylish = require('jshint-stylish');
	var uglify  = require('gulp-uglify');
	var concat  = require('gulp-concat');
	var less    = require('gulp-less');

	var paths = {
		js: [
			'./bower_components/jquery/dist/jquery.js',
			'./bower_components/bootstrap/js/transition.js',
			'./bower_components/bootstrap/js/affix.js',
			'./bower_components/bootstrap/js/alert.js',
			'./bower_components/bootstrap/js/button.js',
			'./bower_components/bootstrap/js/carousel.js',
			'./bower_components/bootstrap/js/collapse.js',
			'./bower_components/bootstrap/js/dropdown.js',
			'./bower_components/bootstrap/js/modal.js',
			'./bower_components/bootstrap/js/popover.js',
			'./bower_components/bootstrap/js/scrollspy.js',
			'./bower_components/bootstrap/js/tab.js',
			'./bower_components/bootstrap/js/tooltip.js',
			'./src/js/*.js'
		],
		jsWatch: './src/js/*.js',
		less: './src/less/master.less',
		lessWatch: './src/less/**/*.less',
		build: 'template/assets/'
	};


// JS
	gulp.task('jshint', function () {
		return gulp.src(paths.jsWatch)
					.pipe(jshint())
					.pipe(jshint.reporter('jshint-stylish'))
					.on('error', handleError);
	});

	gulp.task('js', ['jshint'], function() {
		return gulp.src(paths.js)
					.pipe(concat('scripts.js'))
					.pipe(gulp.dest(paths.build + 'js'))
					.pipe(concat('scripts.min.js'))
					.pipe(uglify())
					.pipe(gulp.dest(paths.build + 'js'));
	});


// LESS
	gulp.task('less', function() {
		return gulp.src(paths.less)
					.pipe(less({compress: true}))
					.on('error', handleError)
					.pipe(gulp.dest(paths.build + 'css'));
	});

// Task Definiitions
	gulp.task('build', ['less', 'js']);
	gulp.task('default', ['build']);

	gulp.task('watch', function () {
		gulp.watch(paths.jsWatch, ['js']);
		gulp.watch(paths.lessWatch, ['less']);
	});


// Functions
	function handleError(err) {
		console.log(err.toString());
		this.emit('end');
	}