const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp
  .task('test', async () => gulp.src([
    'tests/unit/*.js',
  ])
    .pipe(mocha({
      exit: true,
      require: [
        './tests/helpers',
      ],
    }))
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    }));
