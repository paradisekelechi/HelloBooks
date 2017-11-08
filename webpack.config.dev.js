import webpack from 'webpack';
import path from 'path';

export default {
  entry: path.resolve(__dirname, 'client/index.js'),
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
    rules: [{
        test: [/\.js$/, /\.jsx$/],
        use: ['babel-loader'],
        include: path.join(__dirname, 'client')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          'file-loader', 'url-loader'
        ],
      },
    ]
  },
};
