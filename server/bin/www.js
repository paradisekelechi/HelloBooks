import app from '../app.js';
import http from 'http';
import cron from 'node-cron';
import dotenv from 'dotenv';
import userProfiller from '../server/controller/userprofiling';

let port = 9080;
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

// userProfiller.profileUsers();

// cron.schedule('*/2 * * * *', function(){
//     userProfiller.profileUsers;
// });

