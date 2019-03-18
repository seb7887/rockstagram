const http = require('http');
const chalk = require('chalk');
const db = require('./db');

const app = require('./app');
const config = require('./config');

const port = parseInt(config.port, 10);

const server = http.createServer(app);

server.listen(port, () => {
  db()
    .sequelize.sync()
    .then(() => console.log(chalk.green('Postgres: Connection Succeded')))
    .catch(err => console.log(err));
  console.log(chalk.bgCyan.black.bold(`Listen on port ${port}`));
});
