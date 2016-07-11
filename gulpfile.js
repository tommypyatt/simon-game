const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

gulp.task('default', ['watch']);

gulp.task('jsx', () =>
    gulp.src('js/main.jsx')
        .pipe(babel({
            presets: ['react']
        }))
        .pipe(gulp.dest('js/'))
);

gulp.task('watch', () =>
    gulp.watch('js/*.jsx', ['jsx'])
);
