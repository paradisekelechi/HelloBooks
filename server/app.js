import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.text({ type: 'text/html' }))

app.use(bodyParser.json({ type: 'application/*+json' }))


routes(app);

app.get('*', (req, res) => res.status(200).send({
    message: "Welcome to Hello Books application",
}));



export default app;