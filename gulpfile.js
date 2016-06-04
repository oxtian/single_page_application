'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
var path = require('path');

gulp.task('setup');

gulp.task('less', function () {
  return gulp.src('./www/**/*.less') // /**/*.less means access to the .less file at every folder level
    .pipe(less({ //change every .less file into .css file
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./www/')); // then put back in original location
});