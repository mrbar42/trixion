'use strict';

let webpack = require('webpack');
let pack = require('./package.json');
let path = require('path');

let libraryName = pack.name;

let plugins = [], outputFile;

outputFile = libraryName + '.js';

let config = {
  entry: __dirname + '/src/lib',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel!eslint',
        exclude: /(node_modules|bower_components)/
      }
    ],
    eslint: {
      failOnWarning: true
    }
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins,
  node: {
    process: false,
    global: false
  }
};

module.exports = config;
