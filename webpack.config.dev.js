import webpack from 'webpack';
import path from 'path';

export default {
  entry: path.resolve(__dirname, 'client/index'),
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, include: path.join(__dirname, 'client'), loaders: ['babel-loader'] },
      {
        test: /(\.css)$/,
        loaders: ['style-loader', 'css-loader']
      },
      { test: /\.(woff|png|jpeg|jpg|gif)$/, loader: 'url-loader?limit=10000' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  }
};
