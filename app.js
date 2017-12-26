import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';

import routes from './server/routes';
import logger from './tools/logger';

dotenv.config();

/**
 * Create application using express
 */
const app = express();
logger('info', 'Application created');
/**
 * Set the default port the application listens to
 */
const port = process.env.PORT || 4040;
app.set('port', port);


/**
 * Create the server based on the app created
 */
const server = http.createServer(app);

/**
 * Create stream for logging transactions to the application
 */
if (!fs.existsSync(path.join(__dirname, 'logs'))) {
  fs.mkdirSync(path.join(__dirname, 'logs'));
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {
    flags: 'a'
  });
  app.use(morgan('combined', {
    stream: accessLogStream
  }));
}

/**
 * Implement and use middlewares
 */
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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, user-token'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

/**
 * Default route
 */
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, './dist');
  const filePath = path.join(buildPath, 'index.html');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(filePath);
  });
}

/**
 * Set up application route
 */
routes(app);

/**
 * Start server
 */
server.on('error', (error) => {
  logger('error', error);
});
server.listen(port, () => {
  logger('info', `Server started and listening on port ${port} `);
});

export default app;
