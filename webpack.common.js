const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, './client/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      title: 'production'
    }),
    new DotenvPlugin({
      path: '.env'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js(x)$/,
      include: path.join(__dirname, 'client'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-3'],
        plugins: [
          ['transform-object-rest-spread'],
        ],
      },
    },
    {
      test: /\.css$/,
      loader: 'style-loader?name=assets/style/[name].[ext]'
    }, {
      test: /\.css$/,
      loader: 'css-loader',
      query: {
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    },
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    },
    {
      test: /\.(jpg|png|jpeg|svg)$/,
      loader: 'url-loader?name=[name].[ext]&limit=10',
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader'
    },
    {
      test: /\.(woff|woff2)$/,
      loader: 'url-loader?prefix=font/&limit=5000'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }
    ]
  }
};
