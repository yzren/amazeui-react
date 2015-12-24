import path from 'path';
import pkg from './package.json';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import webpack from 'webpack-stream';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

import buildConfig from './webpack.build';
import docsConfig from './webpack.docs';

const isProduction = process.env.NODE_ENV === 'production';
const $ = loadPlugins();

const paths = {
  src: {
    docs: {
      js: 'docs/app.js',
      i: 'docs/assets/i/*',
      less: 'docs/docs.less'
    },
    build: 'src/AMUIReact.js'
  },
  dist: {
    docs: './www',
    build: './dist',
    lib: './lib'
  }
};

const buildDate = $.util.date(Date.now(), 'isoDateTime');
const banner = [
  '/*! <%= pkg.title %> v<%= pkg.version %>',
  'by Amaze UI Team',
  '(c) ' + $.util.date(Date.now(), 'UTC:yyyy') + ' AllMobilize, Inc.',
  'Licensed under <%= pkg.license %>',
  buildDate + ' */\n'
].join(' | ');
const buildBanner = '/*! build: ' + buildDate + ' */';

gulp.task('build', () => {
  return gulp.src(paths.src.build)
    .pipe(webpack(buildConfig))
    .on('error', function(err) {
      console.log(err);
    })
    .pipe($.replace('__VERSION__', pkg.version))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest(paths.dist.build))
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest(paths.dist.build))
    .pipe($.size({showFiles: true, title: 'minified'}))
    .pipe($.size({showFiles: true, gzip: true, title: 'gzipped'}));
});

var docBundler = () => {
  var s = gulp.src('docs/app2.js')
    .pipe(webpack(docsConfig))
    .pipe($.replace('__VERSION__', pkg.version));

  return !isProduction ? s.pipe(gulp.dest(paths.dist.docs))
    .pipe($.size({
      showFiles: true,
      title: 'Docs bundle'
    })) : s.pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe($.header(buildBanner))
    .pipe(gulp.dest(paths.dist.docs))
    .pipe($.size({
      showFiles: true,
      title: 'Docs bundle minified'
    }))
    .pipe($.size({
      showFiles: true,
      gzip: true,
      title: 'Docs bundle gzipped'
    }));
};

gulp.task('docs:js', docBundler);

gulp.task('docs:copy', () => {
  return gulp.src('./docs/index.html')
    .pipe($.replace(/{{assets.'(.+)'.{0,1}(|min)}}/g, function(match, $1, $2) {
      var file = $1;

      if ($2 && isProduction) {
        var extname = path.extname($1);

        file = $1.replace(extname, '.') + $2 + extname;
      }
      // return isProduction ? '/react/' + file : file;
      return isProduction ? 'http://s.amazeui.org/assets/react/' + file : file;
    }))
    .pipe($.replace(/<script id="stat">[\s\S]*<\/script>/g, function(match) {
      return isProduction ? match : '';
    }))
    .pipe($.replace(/__UICDN__/g, function(match, $1) {
      return isProduction ? 'http://cdn.amazeui.org/amazeui/2.4.0/' : '';
    }))
    .pipe(gulp.dest(paths.dist.docs));
});

gulp.task('docs', ['docs:js', 'docs:copy']);

// upload docs assets to Qiniu
gulp.task('docs:qn', function() {
  gulp.src(['dist/docs/**/*', '!dist/docs/**/*.html'])
    .pipe($.qndn.upload({
      prefix: 'assets/react',
      qn: {
        accessKey: process.env.qnAK,
        secretKey: process.env.qnSK,
        bucket: process.env.qnBucketUIS,
        domain: process.env.qnDomainUIS
      }
    }));
});

gulp.task('dev', ['docs'], function() {
  var bs = browserSync.create();
  bs.init({
    notify: false,
    logPrefix: 'AMR',
    server: {
      baseDir: ['www', 'node_modules/amazeui/dist'],
      // @see https://github.com/BrowserSync/browser-sync/issues/204
      middleware: function(req, res, next) {
        var match = req.url.match(/\/[css|fonts|i].+\..+|\/app\.js|\/app\.min\.js/g);
        req.url = match ? match[0] : '/index.html';

        return next();
      }
    }
  });

  gulp.watch('docs/**/*.less', ['docs:less']);
  gulp.watch(paths.src.docs.i, ['docs:copy:i']);
  gulp.watch(paths.src.docs.html, ['docs:copy:html']);
  gulp.watch(['dist/**/*'], bs.reload);
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['build']);
});

gulp.task('npm:clean', function() {
  return del([
    paths.dist.lib,
    paths.dist.build
  ]);
});

gulp.task('npm:jsx', function() {
  return gulp.src(['src/**/*.js', '!src/__tests__/*.js'])
    .pipe($.if(function(file) {
      return file.path.indexOf('AMUIReact.js') > -1;
    }, $.replace('__VERSION__', pkg.version)))
    .pipe($.babel())
    .pipe(gulp.dest(paths.dist.lib));
});

gulp.task('npm:publish', function(done) {
  require('child_process')
    .spawn('npm', ['publish'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('release:tag', function(done) {
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  $.git.tag(v, message, function(err) {
    if (err) {
      throw err;
    }
    $.git.push('origin', 'master', function(error) {
      if (error) {
        throw error;
      }
      done();
    });
  });
});

// Publish to npm
gulp.task('npm', function(cb) {
  runSequence(
    'npm:clean',
    ['npm:jsx', 'build'],
    'npm:publish',
    cb);
});

gulp.task('release', function(cb) {
  runSequence('npm', 'realese:tag', cb);
});

gulp.task('default', ['dev', 'build', 'watch']);

// 使用 https://www.npmjs.com/package/html-webpack-plugin 生成首页
