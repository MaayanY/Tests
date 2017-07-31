// Allow ES6. It doesn't affect the file
// in which it is executed, hence extraction
// of the Gulp tasks into a separate folder.
// Relies on .babelrc file being somewhere in folder hierarchy.
require('babel-core/register');


// Loaded to register the contained Gulp tasks.
// Not used directly. Note: use relative paths.
require('./build/webpack');
require('./build/browser-sync');
require('./build/unit-test');

const fs = require('fs');
const gulp = require('gulp');
const bump = require('gulp-bump');
const war = require('gulp-war');
const zip = require('gulp-zip');
const rename = require("gulp-rename");
const ASSETS_FOLDER = '/assets/';
const semver = require('semver');
// Defines the default task.

// gulp.task('build', ['test', 'build:comp', 'build:test']);
// gulp.task('default', ['test:watch', 'build:comp:watch', 'build:test:watch', 'server']);

gulp.task('build', ['build:comp', 'build:test']);
gulp.task('demo', ['build:demo:watch', 'server']);

gulp.task('war', function() {
    gulp.src(["demo/public/**/*"])
        .pipe(rename(function (path) {
            if (path.extname !== '.html' && path.extname !== '.ico') {
                path.dirname = ASSETS_FOLDER + path.dirname;
            }
        }))
        .pipe(war({
            welcome: 'index.html',
            displayName: 'BreadCrumbItem WAR',
        }))
        .pipe(zip('BreadCrumbItem.war'))
        .pipe(gulp.dest("./dist"));
});

gulp.task('default', ['test:watch', 'build:comp:watch', 'build:test:watch', 'server']);

gulp.task('bump', function(){
    const packageVersion = getSemVer();
    const version = packageVersion.major + '.' + packageVersion.minor + '.' + (process.env.BUILD_NUMBER || '0').trim();

    gulp.src('./*.json')
        .pipe(bump({key: 'version', version: version}))
        .pipe(gulp.dest('./'));
});

function getSemVer () {
    var packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    var version = packageJSON.version;

    return {
        major: semver.major(version),
        minor: semver.minor(version),
        patch: semver.patch(version)
    };
}