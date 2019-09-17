const gulp = require('gulp');
const less = require('gulp-less');
const minifyCss = require('gulp-minify-css');
const px2rem = require('gulp-PX3rem');
const del = require('del');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
//删除Build文件
gulp.task('clean:Build', function () {
  return del([
    './build/**/',
  ]);
});

gulp.task('images', function () {
  return gulp.src('./app/views/static/images/**')
    .pipe(gulp.dest('./dist/assets/images/'));
});

gulp.task('fonts', function () {
  return gulp.src('./app/views/static/fonts/**')
    .pipe(gulp.dest('./dist/assets/fonts/'));
});

gulp.task('less', function () {
  return gulp.src('./app/views/static/style/*.less')
    .pipe(less())
    .pipe(px2rem({
      remUnit: 75,
      remVersion: true
    }))
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/assets/css/'));
});

gulp.task('auto', function () {
  gulp.watch([
    './app/views/*.less',
    './app/views/**/*.less',
    './app/views/**/**/*.less',
    './app/views/**/**/**/*.less',
    './app/views/**/**/**/**/*.less'
  ], gulp.series('less'));
});

gulp.task('js', function () {
  return gulp.src('./app/views/static/js/*.js')
  // .pipe(babel({presets: [es2015]}))
  // .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js/'));
});

// gulp.task('default', ['less', 'images', 'fonts', 'auto'])
gulp.task('default', gulp.series('clean:Build', gulp.parallel('less', 'images', 'fonts', 'auto')));
