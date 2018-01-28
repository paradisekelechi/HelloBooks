const webpack = require('webpack');
const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    inline: true,
    port: 4000,
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BABEL_ENV: JSON.stringify('development'),
      }
    }),
    new DotenvPlugin({
      path: '.env'
    })
  ],
});
