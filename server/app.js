import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import path from 'path';

import routes from './routes';
import config from '../webpack.config.dev';

const app = express();
const compiler = webpack(config);

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(require('webpack-hot-middleware')(compiler));
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

routes(app);
app.get('*', function(req, res) {
    res.sendFile(path.join( __dirname, '../client/index.html'));
});

export default app;