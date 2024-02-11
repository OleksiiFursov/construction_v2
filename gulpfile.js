const gulp = require('gulp');

// Tasks
require('./gulp/dev.js');
require('./gulp/build.js');

gulp.task(
	'default',
	gulp.series(
		'clean:dev',
		gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
		gulp.parallel('server:dev', 'watch:dev')
	)
);

gulp.task(
	'build',
	gulp.series(
		'clean:build',
		gulp.parallel('html:build', 'sass:build', 'images:build', 'fonts:build', 'files:build', 'js:build'),
		gulp.parallel('server:build')
	)
);
