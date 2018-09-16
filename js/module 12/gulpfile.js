'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('gulp-cssnano');
const gcmq = require('gulp-group-css-media-queries');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const stylelint = require('gulp-stylelint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const sequence = require('run-sequence');

gulp.task('html', () =>
  gulp
    .src('./src/html/*.html')
    .pipe(rigger())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      }),
    )
    .pipe(gulp.dest('./build')),
);

gulp.task('styles', () =>
  gulp
    .src('./src/scss/styles.scss')
    .pipe(plumber())
    .pipe(
      stylelint({
        reporters: [{ formatter: 'string', console: true }],
      }),
    )
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gcmq())
    .pipe(gulp.dest('./build/css'))
    .pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream()),
);

gulp.task('scripts', () =>
  gulp
    .src('./src/js/**/*.js')
    .pipe(plumber())
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('./build/js')),
);

gulp.task('watch', () => {
  gulp.watch('src/**/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('src/scss/**/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch('src/js/**/*.js', ['scripts']).on('change', browserSync.reload);
});

gulp.task('serve', ['styles', ], () =>
  browserSync.init({
    server: './build',
    notify: false,
    open: true,
    cors: true,
    ui: false,
    logPrefix: 'DevServer',
    host: 'localhost',
    port: 3000,
  }),
);

gulp.task('del:build', () => del('./build'));

gulp.task('build', cb =>
  sequence(
    'del:build',
    'styles',
    'html',
    'scripts',
    cb,
  ),
);

gulp.task('start', cb => sequence('build', 'serve', 'watch'));