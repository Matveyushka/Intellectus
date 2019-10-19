/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const commonConfig = require('./webpack.config');

module.exports = env => merge(commonConfig, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      STUB: env ? env.STUB : false,
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: ['public', 'dist'],
    port: 9001,
    compress: true,
    open: true,
    overlay: true,
    historyApiFallback: true,
    watchContentBase: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    proxy: [{
      context: ['/questions', '/answers', '/feedback'],
      target: 'http://localhost:9000/',
    }],
  },
});
