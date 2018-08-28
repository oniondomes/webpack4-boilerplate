const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssNano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = (...dir) => path.join(__dirname, '..', ...dir);

const envOptions = {
  production: {
    plugins: [
      new OptimizeCssAssetsPlugin({
        cssProcessor: cssNano,
        canPrint: true,
      }),
      new MiniCssExtractPlugin({
        filename: 'main.css',
      }),
      new CleanWebpackPlugin(['dist'], {
        root: resolve(),
        verbose: true,
      }),
    ],
  },
  development: {
    devServer: {
      contentBase: resolve('src'),
      hot: true,
    },
    devtool: 'eval-source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
  },
};

const baseConfig = {
  entry: ['@babel/polyfill', resolve('src', 'index.js')],
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
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src', 'index.html'),
    }),
  ],
};

module.exports = (env, argv) => {
  baseConfig.module.rules.push({
    test: /\.scss$/,
    use: [
      argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  });

  return merge(baseConfig, envOptions[argv.mode]);
};
