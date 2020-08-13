const {src, dest, parallel, series, watch} = require('gulp');
const SASS = require('gulp-sass');
const NOTIFY = require('gulp-notify');
const RENAME = require('gulp-rename');
const AUTOPREFIXER = require('gulp-autoprefixer');
const CLEAN_CSS = require('gulp-clean-css');
const SOURCEMAP = require('gulp-sourcemaps');
const BROWSER_SYNC = require('browser-sync').create();
const FILE_INCLUDE = require('gulp-file-include');
const SVG_SPRITE = require('gulp-svg-sprite');
const WEBP = require('gulp-webp');
const TTF_2_WOFF = require('gulp-ttf2woff');
const TTF_2_WOFF_2 = require('gulp-ttf2woff2');
const FS = require('fs');
const DEL = require('del');
const WEBPACK = require('webpack');
const WEBPACK_STREAM = require('webpack-stream');
const UGLIFY = require('gulp-uglify-es').default;
const TINY = require('gulp-tinypng-compress');
const IMAGE_MIN = require('gulp-imagemin');


const FORMAT_FONTS = () => {
	src('./src/fonts/**.ttf')
		.pipe(TTF_2_WOFF())
		.pipe(dest('./app/fonts/'))
	return src('./src/fonts/**.ttf')
		.pipe(TTF_2_WOFF_2())
		.pipe(dest('./app/fonts/'))
}
/*
const CB = () => {}

let srcFonts = './src/scss/_fonts.scss';
let appFonts = './app/fonts/';

const MAKE_FONT_STYLES = (done) => {
	let file_content = FS.readFileSync(srcFonts);

	FS.writeFile(srcFonts, '', CB);
	FS.readdir(appFonts, function (err, items) {
		if (items) {
			let c_fontname;
			for (var i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
				if (c_fontname != fontname) {
					FS.appendFile(srcFonts, '@include font-face("' + fontname + '", "' + fontname + '", 400);\r\n', CB);
				}
				c_fontname = fontname;
			}
		}
	})

	done();
} */

const MAKE_SVG_SPRITE = () => {
	return src('./src/img/**/*.svg')
		.pipe(SVG_SPRITE({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			}
		}))
		.pipe(dest('./app/img'))
} 

const MAKE_STYLES = () => {
	return src('./src/scss/**/*.scss')
		.pipe(SOURCEMAP.init())
		.pipe(SASS({
			outputStyle: 'expanded'
		}).on('error', NOTIFY.onError()))
		.pipe(RENAME({
			suffix: '.min'
		}))
		.pipe(AUTOPREFIXER({
			cascade: false,
		}))
		.pipe(CLEAN_CSS({
			level: 2
		}))
		.pipe(SOURCEMAP.write('.'))
		.pipe(dest('./app/css/'))
		.pipe(BROWSER_SYNC.stream());
}

const HTML_INCLUDE = () => {
	return src(['./src/*.html'])
		.pipe(FILE_INCLUDE({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(dest('./app'))
		.pipe(BROWSER_SYNC.stream());
}

const CONVERT_WEBP = () => {
	return src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.jpeg'])
		.pipe(WEBP({
			quality: 100
		}))
		.pipe(dest('./app/img'))
}

const IMG_TO_APP = () => {
	return src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.jpeg'])
	/*	.pipe(IMAGE_MIN({
			progressive: true,
			interlaced: true,
			optimizationLevel: 0
		})) */
		.pipe(dest('./app/img'))
}

const ADDITIONAL_FILES_TO_APP = () => {
	return src('./src/resources/**')
		.pipe(dest('./app'))
}

const DELETE_APP = () => {
	return DEL(['app/*'])
}

const CONVERT_SCRIPTS_TO_APP = () => {
	return src('./src/js/main.js')
		.pipe(WEBPACK_STREAM({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
		}))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end'); // Don't stop the rest of the task
		})

		.pipe(SOURCEMAP.init())
		.pipe(UGLIFY().on("error", NOTIFY.onError()))
		.pipe(SOURCEMAP.write('.'))
		.pipe(dest('./app/js'))
		.pipe(BROWSER_SYNC.stream());
}

const WATCH_FILES = () => {
	BROWSER_SYNC.init({
		server: {
			baseDir: "./app"
		}
	});

	watch('./src/scss/**/*.scss', MAKE_STYLES);
	watch('./src/*.html', HTML_INCLUDE);
	watch('./src/html/**.html', HTML_INCLUDE);
	watch('./src/img/**.jpg', IMG_TO_APP);
	watch('./src/img/**.png', IMG_TO_APP);
	watch('./src/img/**.jpeg', IMG_TO_APP);
	watch('./src/img/**.jpg', CONVERT_WEBP);
	watch('./src/img/**.png', CONVERT_WEBP);
	watch('./src/img/**.jpeg', CONVERT_WEBP);
	watch('./src/img/**.svg', MAKE_SVG_SPRITE);
	watch('./src/resources/**', ADDITIONAL_FILES_TO_APP);
	watch('./src/fonts/**.ttf', FORMAT_FONTS);
	/* watch('./src/fonts/**.ttf', MAKE_FONT_STYLES); */
	watch('./src/js/**/*.js', CONVERT_SCRIPTS_TO_APP);
}

exports.styles = MAKE_STYLES;
exports.watchFiles = WATCH_FILES;
exports.fileinclude = HTML_INCLUDE;

exports.default = series(DELETE_APP, parallel(HTML_INCLUDE, CONVERT_SCRIPTS_TO_APP, FORMAT_FONTS, ADDITIONAL_FILES_TO_APP, IMG_TO_APP, CONVERT_WEBP, MAKE_SVG_SPRITE), /*MAKE_FONT_STYLES,*/ MAKE_STYLES, WATCH_FILES);


// const tinypng = () => {
// 	return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg'])
// 		.pipe(TINY({
// 			key: '',
// 			log: true
// 		}))
// 		.pipe(dest('./app/img'))
// }

const STYLE_BUILD = () => {
	return src('./src/scss/**/*.scss')
		.pipe(SASS({
			outputStyle: 'expanded'
		}).on('error', NOTIFY.onError()))
		.pipe(RENAME({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(dest('./app/css/'))
}

const SCRIPTS_BUILD = () => {
	return src('./src/js/main.js')
		.pipe(WEBPACK_STREAM({
				mode: 'development',
				output: {
					filename: 'main.js',
				},
				module: {
					rules: [{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env']
							}
						}
					}]
				},
			}))
			.on('error', function (err) {
				console.error('WEBPACK ERROR', err);
				this.emit('end'); // Don't stop the rest of the task
			})
		.pipe(UGLIFY().on("error", NOTIFY.onError()))
		.pipe(dest('./app/js'))
}

exports.build = series(DELETE_APP, parallel(HTML_INCLUDE, SCRIPTS_BUILD, FORMAT_FONTS, ADDITIONAL_FILES_TO_APP, IMG_TO_APP, CONVERT_WEBP, MAKE_SVG_SPRITE), /*MAKE_FONT_STYLES,*/ STYLE_BUILD, /*tinypng*/);

