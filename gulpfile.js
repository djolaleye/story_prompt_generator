// Initialize modules
const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss') 
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const browsersync = require('browser-sync').create();


// Sass Task
function scssTask() {
    return src('public/styles/styles.scss', {sourcemaps: true}) 
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist', {sourcemaps: '.'}));
    }

// Javascript Task
function jsTask() {
    return src('js/index.js', {sourcemaps: true}) 
        .pipe(babel({ presets: ['@babel/preset-env']}))
        .pipe(terser())
        .pipe(dest('dist', {sourcemaps: '.'}));
    }

// Browsersync
function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: './views',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    });
    cb();
}

function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(
        ['public/styles/**/*.scss', 'js/**/*.js'],
        series (scssTask, jsTask, browserSyncReload)
    );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
