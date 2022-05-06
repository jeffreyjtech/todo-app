'use strict';

const express  = require ('express');
const cors = require ('cors');

const authRouter = require('./auth/routes.js');
const content = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(content);

app.use('*', (req, res, next) => {

  let error404 = new Error(`Cannot ${req.method} at ${req.route}.`);
  error404.status = 404;
  next(error404);

});

module.exports = {
  app,
  start: PORT => {
    app.listen(PORT, () => {
      console.log('api is listening on ', PORT);
    });
  },
};
