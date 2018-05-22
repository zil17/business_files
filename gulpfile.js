var gulp       = require('gulp'),
    browserSync  = require("browser-sync"),
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano      = require('cssnano'),
    uglify       = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)


gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: './app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function () {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean'], function () {
    var plugins = [
        autoprefixer({ browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'] }),
        cssnano()
    ];
    var buildCss = gulp.src('app/css/**/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('dist/js'))

    var buildLibs = gulp.src('app/libs/**/*') // Переносим библиотеки в продакшен
        .pipe(gulp.dest('dist/libs'))

    var buildImg = gulp.src('app/img/**/*') // Переносим изображения в продакшен
        .pipe(gulp.dest('dist/img'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch']);