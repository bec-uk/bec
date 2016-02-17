'use strict';

var gulp = require('gulp');
var rsync = require('gulp-rsync');
 
gulp.task('deploy', function() {
  return gulp.src(['./dist/**/*', './dist/.*'])
    .pipe(rsync({
      root: 'dist',
      hostname: 'spiraledge.co.uk',
      username: 'spiraledge',
      port: 12321,
      destination: '/home/spiraledge/domains/bec.spiraledge.co.uk/public_html',
      compress: true
    }));
});