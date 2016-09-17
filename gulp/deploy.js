'use strict';

var gulp = require('gulp');
var rsync = require('gulp-rsync');
 
gulp.task('deploy', function() {
  return gulp.src(['./dist/**/*', './dist/.*'])
    .pipe(rsync({
      root: 'dist',
      hostname: 'shell.gridhost.co.uk',
      username: 'livegenb',
      destination: '/var/sites/l/livegen.bristolenergy.coop/public_html',
      compress: true
    }));
});