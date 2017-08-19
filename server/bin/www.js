import app from '../app.js';
import http from 'http';
import cron from 'node-cron';
import userProfiller from '../server/controller/userprofiling';

const port = parseInt(process.env.PORT, 10) || 4000;
app.set('port', port);

const server = http.createServer(app);
server.on('error', (err) => {
    console.log(err);
});
server.listen(port);

// userProfiller.profileUsers();

// cron.schedule('*/2 * * * *', function(){
//     userProfiller.profileUsers;
// });

