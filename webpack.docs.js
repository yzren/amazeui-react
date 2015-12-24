import path from 'path';
import webpack from 'webpack';
import marked from 'marked';
import hl from 'highlight.js';
import HTMLWebpackPlugin from 'html-webpack-plugin';

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
renderer.code = codeRenderer;

export default {
  debug: !isProduction,
  // devtool: !isProduction ? 'eval-source-map' : null,
  output: {
    path: path.join(__dirname, 'www'),
    filename: `app.[hash]${isProduction ? '.min' : ''}.js`,
  },
  module: {
    // noParse: /babel-core/,
    loaders: [
      {
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
      },
      {
        test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
        loader: 'file?name=[path][name].[ext]&context=docs/assets'
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new HTMLWebpackPlugin({
      title: 'Amaze UI React',
      template: 'docs/index.html',
      UICDN: isProduction ? 'http://cdn.amazeui.org/amazeui/2.5.0/' : '',
      assets: isProduction ? 'http://s.amazeui.org/assets/react/' : '',
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: true
      } : null,
    }),
    isProduction ? new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }) : new webpack.BannerPlugin('devlopment version'),

  ],
  // watch: !isProduction,
  node: {
    fs: 'empty'
  },
  markdownLoader: {
    renderer: renderer
  }
};
