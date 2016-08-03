const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const koutoSwiss = require('kouto-swiss');

const PATH = {
  public:           '/',
  entry:            './js/app',
  output:           'js/bundle.js',
  root:             __dirname,
  app:              path.join(__dirname, '/src'),
  dist:             path.join(__dirname, '/www'),
  node_modules:     path.resolve(__dirname, 'node_modules'),
  template:         path.join(__dirname, '/src/index'),
  bootstrap_config: path.join(__dirname, 'bootstrap.config.js')
}

const appRoot = path.join(__dirname, '/src');
const outputRoot = path.join(__dirname, '/www');
module.exports = {
  context: PATH.app,
  entry: [
    PATH.entry
  ],
  output: {
    path: PATH.dist,
    publicPath: PATH.public,
    filename: PATH.output,
  },
  watch: true,
  devtool: 'source-map',
  resolve: {
    modulesDirectories: [
      PATH.app,
      PATH.node_modules,
    ],
    extensions: [
      '',
      '.js',
      '.es6',
      '.coffee',
      '.json',
      '.styl',
      '.css',
      '.pug',
      'otf',
      'svg',
      'ttf',
      'woff',
      'woff2',
      'gif',
      'png',
      'jpg',
      'jpeg',
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['www'], {
      root: PATH.root,
      verbose: true, 
      dry: false,
      exclude: []
    }),
    new HtmlWebpackPlugin({
      title: 'Title',
      filename: 'index.html',
      template: PATH.template,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      }
    }),
    new ExtractTextPlugin('css/styles.css'),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
  ],
  stylus: {
    use: [koutoSwiss()],
  },
  jshint: {
    esversion: 6
  },
  module: {
    preLoaders: [
      {
        test   : /\.(js|es6)$/,
        exclude: [
          PATH.node_modules,
          PATH.bootstrap_config,
        ],
        loader : 'jshint'
      }
    ],
    loaders: [
      {
        test: /\.(pug|jade)$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'pug-html'
      },
      {
        test: /\.styl$/,
        include: [
          path.resolve(__dirname, 'src/stylus/'),
        ],
        exclude: [
          path.resolve(__dirname, 'src/*/variables.styl'),
        ],
        loader: ExtractTextPlugin.extract('style', 'css!stylus'),
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        include: [
          path.resolve(__dirname, 'src/images/'),
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        loader: 'url?name=/images/[name].[ext]!image-webpack'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=./fonts/[name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&name=./fonts/[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=./fonts/[name].[ext]'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=./fonts/[name].[ext]'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=./fonts/[name].[ext]'
      },
      {
        test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery'
      },
      { // for third-party minified scripts, don't process require()
        test: /\.min\.js$/,
        include: /(node_modules|bower_components)/,
        loader: 'script'
      },
      {
        test: /\.coffee$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        loader: 'coffee'
      },
      {
        test: /\.(js|es6)$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        loader: 'ng-annotate!babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
    ],
  },
}