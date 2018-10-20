process.env.NODE_ENV = 'production';

global.isSSR = true;
process.send = process.send || function noop() {};
process.on('unhandledRejection', (...args) => {
  console.error('Unhandled Rejection at: ', ...args); // eslint-disable-line no-console
});

const express = require('express');
const path = require('path');
const morgan = require('morgan');

global.htmlPath = path.resolve(__dirname, '../build/index.html');

const universalLoader = require('../buildSSR');

const app = express();
app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, '../build')));
app.get('/', universalLoader.default);
app.use((req, res) => {
  res.status(404).send();
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`); // eslint-disable-line no-console
  process.send('ready');
  process.on('SIGINT', () => {
    server.close(err => {
      if (err) {
        console.error(err); // eslint-disable-line no-console
        process.exit(1);
      } else {
        process.exit(0);
      }
    });
  });
});
