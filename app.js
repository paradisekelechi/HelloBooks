import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';

import routes from './server/routes';
import config from './webpack.config.babel';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const swaggerDefinition = {
  info: {
    title: 'HelloBooks Application',
    version: '1.0.0',
    description: 'Book management and Library application'
  },
  host: `localhost:${port}`,
  basePath: '/'
};
const options = {
  swaggerDefinition,
  apis: ['./server/routes/index.js']
};
const swaggerSpec = swaggerJSDoc(options);
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

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

routes(app);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

export default app;
