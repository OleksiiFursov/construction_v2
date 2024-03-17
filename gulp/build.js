const gulp = require('gulp');

// HTML
const fileInclude = require('gulp-file-include');
const htmlClean = require('gulp-htmlclean');

// SASS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');

const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const changed = require('gulp-changed');

// Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const cssnano = require("gulp-cssnano");
const gulpIf = require('gulp-if');


gulp.task('clean:build', function (done) {
	if (fs.existsSync('./build/')) {
		return gulp
			.src('./build/', { read: false })
			.pipe(clean({ force: true }));
	}
	done();
});

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};


gulp.task('html:build', function () {
	return gulp
		.src(['./src/html/**/*.html', '!./src/html/blocks/*.html', '!./src/html/blocks/**/*.html', '!./src/html/pages/**/*.html'])
		.pipe(changed('./build/'))
		.pipe(plumber(plumberNotify('HTML')))
		.pipe(fileInclude(fileIncludeSetting))
		//.pipe(webpHTML())
		.pipe(htmlClean())
		.pipe(gulp.dest('./build/'));
});

gulp.task('sass:build', function () {
	return gulp
		.src('./src/scss/*.scss')
		.pipe(changed('./build/css/'))
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sourceMaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(sourceMaps.write())
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('./build/css/'));
});

gulp.task('images:build', function () {
	return gulp
		.src('./src/img/**/*')
		.pipe(changed('./build/img/'))
		.pipe(webp())
		.pipe(gulp.dest('./build/img/'))
		.pipe(gulp.src('./src/img/**/*'))
		.pipe(changed('./build/img/'))
		.pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest('./build/img/'));
});

gulp.task('fonts:build', function () {
	return gulp
		.src('./src/fonts/**/*')
		.pipe(changed('./build/fonts/'))
		.pipe(gulp.dest('./build/fonts/'));
});



gulp.task('pwa:build', function () {
	return gulp
		.src(['./src/*.png', './src/*.ico', './src/*.webmanifest'])
		.pipe(changed('./build/'))
		.pipe(gulp.dest('./build/'))
});

gulp.task('files:build', function () {
	return gulp
		.src('./src/files/**/*')
		.pipe(changed('./build/files/'))
		.pipe(gulp.dest('./build/files/'));
});

gulp.task('js:build', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./build/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(babel())
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./build/js/'));
});

