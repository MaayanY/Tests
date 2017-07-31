
const fs = require('fs');
const gulp = require('gulp');
const bump = require('gulp-bump');
const semver = require('semver');


gulp.task('bump', function(){
    const packageVersion = getSemVer();
    console.log(packageVersion);
    const version = packageVersion.major + '.' + packageVersion.minor + '.' + (process.env.BUILD_NUMBER || '10').trim();
    console.log(version);
    gulp.src('./package.json')
        .pipe(bump({key: 'version', version: version}))
        .pipe(gulp.dest('./'));
});

function getSemVer () {
    var packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    console.log(packageJSON);
    console.log(packageJSON.version);
    var version = packageJSON.version;

    return {
        major: semver.major(version),
        minor: semver.minor(version),
        patch: semver.patch(version)
    };
}