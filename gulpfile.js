var gulp = require("gulp"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps");

// ... other includes
var browserSync = require("browser-sync").create();
// ...

function style() {
    return (
        gulp
            .src('scss/main.scss')
            // .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            // .pipe(postcss([autoprefixer(), cssnano()]))
            // .pipe(rename('styles.css'))
            // .pipe(sourcemaps.write())
            .pipe(gulp.dest('public'))
            // Add browsersync stream pipe after compilation
            .pipe(browserSync.stream())
    );
}

// A simple task to reload the page
function reload() {
    browserSync.reload();
}

function watch() {
    style();
    reload();
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('scss/**/*', style);
    
    gulp.watch('index.html', reload);
}

exports.watch = watch