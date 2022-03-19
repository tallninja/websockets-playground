const express = require('express');
const cors = require('cors');

const routes = require('./routes');

class App {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/', routes);
  }
}

module.exports = new App().app;
