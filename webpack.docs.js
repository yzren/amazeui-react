var path = require('path');

/*import path from 'path';
import webpack from 'webpack';
import marked from 'marked';
import hl from 'highlight.js';

const isProduction = process.env.NODE_ENV === 'production';
const codeRenderer = function(code, lang) {
  lang = lang === 'js' ? 'javascript' : lang;
  if (lang === 'html') {
    lang = 'xml';
  }

  let hlCode = lang ?
    hl.highlight(lang, code).value : hl.highlightAuto(code).value;

  return `<div class="doc-highlight"><pre>
<code class="${lang || ''}">${hlCode}</code></pre></div>`;
};

let renderer = new marked.Renderer();
renderer.code = codeRenderer;*/

module.exports = {
  // debug: !isProduction,
  // devtool: !isProduction ? 'eval-source-map' : null,
  entry: './docs/app2.js',
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'app.js',
  },
  module: {
    // noParse: /babel-core/,
    loaders: [
      /*{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'transform/cacheable?brfs',
          'babel'
        ],
      },
      {
        test: /\.less$/,
        loaders: [
          'style',
          'css?minimize',
          'autoprefixer',
          'less'
        ],
        include: [
          path.join(__dirname, 'docs')
        ]
      },
      {
        test: /\.md$/,
        loader: 'html!markdown'
      },*/
      {
        test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
        loader: 'file?name=[name].[ext]'
      },
    ]
  },
  /*plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ],
  // watch: !isProduction,
  node: {
    fs: 'empty'
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  },
  markdownLoader: {
    renderer: renderer
  }*/
};
