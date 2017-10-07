import app from '../app.js';
import http from 'http';
import dotenv from 'dotenv';

/*eslint-disable no-console */

//Set the default port the application listens to
let port = 9080;

//Define the port configuration based on the environment
if(process.env.NODE_ENV == 'production' || 'development'){
    dotenv.load();
    const configuration = dotenv.config().parsed;
    if (configuration.PORT) {
        port = configuration.PORT;
    }
}
app.set('port', port);

const server = http.createServer(app);
server.on('error', (err) => {
    console.log(err);
});
server.listen(port, ()=> {
    console.log(`Server started and listening on port ${port} `);
});
