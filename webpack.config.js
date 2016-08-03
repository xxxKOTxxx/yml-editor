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
  bower_components: path.resolve(__dirname, 'bower_components'),
  template:         path.join(__dirname, '/src/index'),
  stylus:           path.resolve(__dirname, 'src/stylus'),
  stylus_variables: path.resolve(__dirname, 'src/stylus/*/variables.styl'),
  images:           path.resolve(__dirname, 'src/images/'),
  bootstrap_config: path.join(__dirname, 'bootstrap.config.js'),
};

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
  devtool: 'cheap-inline-source-map',
  resolve: {
    modulesDirectories: [
      PATH.app,
      PATH.node_modules,
    ],
    extensions: [
      '',
      '.js',
      '.es6',
      '.json',
      '.coffee',
      '.pug',
      '.css',
      '.styl',
      '.gif',
      '.png',
      '.jpg',
      '.jpeg',
      '.svg',
      '.otf',
      '.ttf',
      '.woff',
      '.woff2',
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
          'ws',
        ],
        loader : 'jshint'
      }
    ],
    loaders: [
      {
        test: /\.(pug|jade)$/,
        include: [
          PATH.app,
        ],
        loader: 'pug-html'
      },
      {
        test: /\.styl$/,
        include: [
          PATH.stylus,
        ],
        exclude: [
          PATH.stylus_variables,
        ],
        loader: ExtractTextPlugin.extract('style', 'css!stylus'),
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        include: [
          PATH.images,
        ],
        exclude: [
          PATH.node_modules,
        ],
        loader: 'file?name=images/[name].[ext]!image-webpack'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=./fonts/[name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery'
      },
      { // for third-party minified scripts, don't process require()
        test: /\.min\.js$/,
        include: [
          PATH.node_modules,
          PATH.bower_components,
        ],
        loader: 'script'
      },
      {
        test: /\.coffee$/,
        include: [
          PATH.app,
        ],
        exclude: [
          PATH.node_modules,
        ],
        loader: 'coffee'
      },
      {
        test: /\.(js|es6)$/,
        include: [
          PATH.app,
        ],
        exclude: [
          PATH.node_modules,
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