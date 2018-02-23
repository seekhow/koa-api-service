const koa = require('koa');
const logger = require('koa-logger');

const routes = require('./api');
const mongoose = require('./plugin/mongoose');

const app = new koa();

app.use(logger());
app.use(mongoose);

routes.map(route => app.use(route.middleware()));

app.listen(4000);
