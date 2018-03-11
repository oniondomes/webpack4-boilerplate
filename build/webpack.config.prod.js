const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const prodConfig = {
  plugins: [
    new UglifyJsPlugin({
      cache: true,
      uglifyOptions: {
        ecma: 5,
        output: {
          comments: false,
          beautify: false,
        },
      },
    }),
    new CleanWebpackPlugin(['docs']),
  ],
};

module.exports = merge(baseConfig, prodConfig);
