/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';

import babel from 'gulp-babel';
import browserify from 'gulp-browserify';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

const files = {
  rawJS: ['./src/**/*.js'],
};

gulp.task('transpile', () =>
  gulp.src(files.rawJS)
    .pipe(babel())
    .pipe(gulp.dest('./build'))
);

gulp.task('browserify', ['transpile'], () =>
  gulp.src('./build/main.js')
    .pipe(browserify({
      standalone: 'YTMusic',
    }))
    .pipe(rename('ytmusic.js'))
    .pipe(gulp.dest('./dist'))
);

gulp.task('uglify', ['browserify'], () =>
  gulp.src('./dist/ytmusic.js')
    .pipe(uglify())
    .pipe(rename('ytmusic.min.js'))
    .pipe(gulp.dest('./dist'))
);

gulp.task('build', ['uglify']);
