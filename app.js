import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import http from 'http';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';

import routes from './server/routes';
import config from './webpack.config.babel';

dotenv.config();

/**
 * Create application using express
 */
const app = express();

/*  eslint-disable no-console */

/**
 * Set the default port the application listens to
 */
const port = process.env.PORT || 5000;
app.set('port', port);

/**
 * Swagger definition for api documentation
 */
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


/**
 * Webpack setup using the configuration as set out in the webpack config file
 */
const compiler = webpack(config);

/**
 * Create the server based on the app created
 */
const server = http.createServer(app);


/**
 * Implement and use middlewares
 */
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

/**
 * Setup swagger route
 */
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/**
 * Set up application route
 */
routes(app);

/**
 * Default route
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

/**
 * Start server
 */
server.on('error', (err) => {
  console.log(err);
});
server.listen(port, () => {
  console.log(`Server started and listening on port ${port} `);
});

export default app;
