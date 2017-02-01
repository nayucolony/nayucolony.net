// plugin
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');


// sass compile
gulp.task('sass',()=>{
  return gulp.src("./src/sass/*.scss")
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest("./static"));
});


gulp.task('watch', ()=>{
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default',['watch']);
