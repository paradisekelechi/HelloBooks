import app from '../app.js';
import http from 'http';

const port = parseInt(process.env.PORT, 10) || 4000;
app.set('port', port);

const server = http.createServer(app);
server.on('error', (err) => {
    console.log(err);
});
server.listen(port);
