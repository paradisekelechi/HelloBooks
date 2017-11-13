import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import dotenv from 'dotenv';

import routes from './server/routes';
import config from './webpack.config.babel';

dotenv.config();
const app = express();
const compiler = webpack(config);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.text({
  type: 'text/html'
}));
app.use(bodyParser.json({
  type: 'application/*+json'
}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(webpackHotMiddleware(compiler));
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

routes(app);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

export default app;
