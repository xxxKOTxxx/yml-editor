const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const koutoSwiss = require('kouto-swiss');

const appRoot = path.join(__dirname, "/src");
module.exports = {
  context: path.resolve('src'),
  entry: [
    "./js/app"
  ],
  output: {
    path: path.join(__dirname, "www"),
    filename: '/js/bundle.js',
  },
  watch: true,
  // devtool: 'source-map',
  resolve: {
    modulesDirectories: [
      "src",
      'node_modules',
    ],
    extensions: [
      '',
      '.js',
      '.min.js',
      '.es6',
      '.css',
      '.styl',
      '.pug',
      'otf',
      'svg',
      'ttf',
      'woff',
      'woff2'
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['www'], {
      root: __dirname,
      verbose: true, 
      dry: false,
      exclude: ['']
    }),
    new HtmlWebpackPlugin({
      title: 'Title',
      chunks: ['application', 'vendors'],
      filename: 'index.html',
      template: path.join(appRoot, 'index.pug')
    }),
    new ExtractTextPlugin("css/styles.css"),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
  ],
  stylus: {
    use: [koutoSwiss()],
  },
  eslint: {
    failOnWarning: false,
    failOnError: true
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.(js|es6)$/,
    //     loader: 'eslint',
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      {
        test: /\.(pug|jade)$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        loader: 'pug-html'
      },
      {
        test: /\.styl$/,
        include: [
          path.resolve(__dirname, "src/stylus/"),
        ],
        exclude: [
          path.resolve(__dirname, "src/*/variables.styl"),
        ],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader?resolve-url'),
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=./fonts/[name].[ext]"
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=./fonts/[name].[ext]"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream&name=./fonts/[name].[ext]"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?name=./fonts/[name].[ext]"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml&name=./fonts/[name].[ext]"
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
        test: /\.(js|es6)$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        loader: "ng-annotate!babel-loader"
      },
    ],
  },
}