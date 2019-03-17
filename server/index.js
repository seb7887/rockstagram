const http = require('http');
const db = require('./db');

const app = require('./app');
const config = require('./config');

const port = parseInt(config.port, 10);

const server = http.createServer(app);

server.listen(port, () => {  
  db().sequelize.sync()
    .then(() => console.log(`Postgres: Connection Succeded`))
    .catch(err => console.log(err));
  console.log(`Listen on port ${port}`);
});
