const app = require('../app.js');
const http = require('http');

const port = parseInt(process.env.PORT, 10) || 4000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
