const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include')

// 1. 使用 gulp.task() 方法建立任务 
gulp.task('styles', (done) => {
  // 2. gulp.src获取需要处理的文件
  // 3. .pipe 通过管道操作这个流
  // 4. gulp.dest将处理后的文件输出到 dist 目录
  gulp.src('./src/css/*.css')
    .pipe(gulp.dest('./dist/css'));

  done();
});

// 压缩 html 和 抽取公共代码
gulp.task('htmlmin', (done) => {
  gulp.src('./src/*.html')
    .pipe(fileinclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));

  done()
})