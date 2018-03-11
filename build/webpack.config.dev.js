const webpack = require('webpack');
const merge = require('webpack-merge');

const { resolve } = require('./utils');
const baseConfig = require('./webpack.config.base');

const devConfig = merge.smart(baseConfig, {
  devServer: {
    contentBase: resolve('dist'),
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
});

module.exports = merge(baseConfig, devConfig);
