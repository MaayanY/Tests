// Allow ES6. It doesn't affect the file
// in which it is executed, hence extraction
// of the Gulp tasks into a separate folder.
// Relies on .babelrc file being somewhere in folder hierarchy.



// Loaded to register the contained Gulp tasks.
// Not used directly. Note: use relative paths.


const fs = require('fs');
const gulp = require('gulp');
const bump = require('gulp-bump');
//const zip = require('gulp-zip');
//const rename = require("gulp-rename");
//const ASSETS_FOLDER = '/assets/';
const semver = require('semver');
// Defines the default task.

// gulp.task('build', ['test', 'build:comp', 'build:test']);
// gulp.task('default', ['test:watch', 'build:comp:watch', 'build:test:watch', 'server']);

gulp.task('bump', () => {
    const packageVersion = getSemVer();
    const version = packageVersion.major + '.' + packageVersion.minor + '.' + (process.env.BUILD_NUMBER || '0').trim();

    gulp.src('./*.json')
    .pipe(bump({key: 'version', version: version}))
    .pipe(gulp.dest('./'));
});

const getSemVer = () => {
    const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    const version = packageJSON.version;

    return {
        major: semver.major(version),
        minor: semver.minor(version),
        patch: semver.patch(version)
    };
}