const http = require('http');
const app = require('./app');
const config = require('./config');

const port = parseInt(config.port, 10);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
