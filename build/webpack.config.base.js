const { resolve } = require('./utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssNano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve('dist'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve('src'),
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: resolve('src', 'index.html'),
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssNano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
      disable: true,
    }),
  ],
};
